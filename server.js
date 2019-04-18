const express = require('express')
const app = express()
const port = 8080

const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.komo.co.il/code/nadlan/apartments-for-rent.asp?&subLuachNum=1&nehes=1&cityNum=1312&neighborhoodNum=205';
const url2 = 'https://www.winwin.co.il/RealEstate/ForRent/Search/Gallery/RealEstatePage.aspx?search=1d7eab62cbf6802e07e121bbabe846c3'
let result;
let yad2result;

let allRes = []
const fs = require('fs');

let rawdata = fs.readFileSync('apartments.json');
let dirot = JSON.parse(rawdata);
let resultArray = Array.prototype.concat.apply([], dirot);
let finalRes = []
for (let i = 1; i < resultArray.length; i++) {

    let curr = resultArray[i];

    curr.key = i.toString();

    allRes.push(curr)


}


//const puppeteer = require('puppeteer');

// let scrape = async () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });

//     const page = await browser.newPage();
//     await page.setViewport({
//         width: 0,
//         height: 0
//     });
//     await page.goto('https://www.anglo-saxon.co.il/locales/%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%20%D7%99%D7%A4%D7%95/%D7%93%D7%99%D7%A8%D7%95%D7%AA_%D7%9C%D7%94%D7%A9%D7%9B%D7%A8%D7%94/?SearchForm%5Bis_route%5D=&SearchForm%5Bis_locality%5D=&SearchForm%5Bis_neighborhood%5D=&SearchForm%5Blatitude%5D=&SearchForm%5Blongitude%5D=&SearchForm%5Bvicinity%5D=&SearchForm%5Bplace_name%5D=&SearchForm%5Blocality_name%5D=&SearchForm%5Bgoogle_results_found%5D=0&SearchForm%5Bresult_is_in_a_locality%5D=&SearchForm%5Bstreet%5D=&SearchForm%5Bcity%5D=&SearchForm%5Bcountry%5D=&SearchForm%5Brooms%5D=&SearchForm%5Bproperty_type%5D=&SearchForm%5Bproperty_type%5D%5B%5D=1&SearchForm%5Bprice_ranges%5D=');
//     await page.waitFor(3000);

//     const result = await page.evaluate(() => {

//         const resLength = 25;
//         let data = []

//         let propertyIDS = [];


//         for (var i = 1; i < resLength; i++) {

//             try {



//                 let propID = document.querySelector('#propery-results > div.col-lg-9.col-md-9.col-sm-9.col-xs-12.all_box_wrapper > div:nth-child(' + i + ') > div > a').href;

//                 // let roomsPattern = details1.split('\n')
//                 let price = document.querySelector('#propery-results > div.col-lg-9.col-md-9.col-sm-9.col-xs-12.all_box_wrapper > div:nth-child(' + i + ') > div > a > div.appart_box_content > div.appart_box_bottom.clearfix > div:nth-child(2)').innerText
//                 // let rooms = roomsPattern[3]
//                 let title = document.querySelector('#propery-results > div.col-lg-9.col-md-9.col-sm-9.col-xs-12.all_box_wrapper > div:nth-child(' + i + ') > div > a > div.appart_box_content > div.appart_box_location').innerText
//                 let rooms = parseFloat(document.querySelector('#propery-results > div.col-lg-9.col-md-9.col-sm-9.col-xs-12.all_box_wrapper > div:nth-child(' + i + ') > div > a > div.appart_box_content > div.appart_box_bottom.clearfix > div:nth-child(1)').innerText)
//                 // var titleClean = title.replace(/ {1,}/g, ' ').trim();
//                 let randFloor = Math.floor(Math.random() * Math.floor(5)).toString()
//                 let floor = randFloor === '0' ? 'קרקע' : randFloor
//                 let size = parseFloat(document.querySelector('#propery-results > div.col-lg-9.col-md-9.col-sm-9.col-xs-12.all_box_wrapper > div:nth-child(' + i + ') > div > a > div.appart_box_content > div.appart_box_bottom.clearfix > div:nth-child(3)').innerText);
//                 let thumbImg = escape(document.querySelector('#propery-results > div.col-lg-9.col-md-9.col-sm-9.col-xs-12.all_box_wrapper > div:nth-child(' + i + ') > div > a > div.appart_boc_pic').style.cssText);
//                 let start = thumbImg.indexOf('//')
//                 let end = thumbImg.indexOf('.jpg')
//                 let res = thumbImg.substring(start, end)
//                 let finalThumb = unescape(res + '.jpg')
//                 if (finalThumb === '.jpg' || finalThumb.indexOf('background-image') != -1) {
//                     finalThumb = null
//                 }


//                 if (finalThumb.indexOf('//anglo') != -1) {
//                     data.push({
//                         title: title,
//                         propURL: propID,
//                         price: price.replace('₪', '').trim(),
//                         rooms: rooms,
//                         floor: floor,
//                         size: size,
//                         thumbImg: finalThumb,
//                         liked: false
//                     })
//                 }
//                 console.log(propID)
//             } catch ( err ) {
//                 continue;
//             }
//         }

//         return {
//             data
//         }

//     });

//     // browser.close();
//     return result;
// };

// scrape().then((value) => {
//     console.log(value); // Success!
//     allRes.push(value.data)
// });




// let scrape2 = async () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });

//     const page = await browser.newPage();
//     await page.goto('https://www.yad2.co.il/realestate/rent/flats-old-north-north-in-tel-aviv-yafo?city=6900&neighborhood=1501&property=1');
//     await page.waitFor(8000);

//     const result = await page.evaluate(() => {

//         const resLength = 25;
//         let data = []

//         for (var i = 0; i < resLength; i++) {

//             try {

//                 let title = document.querySelector('#feed_item_' + i + ' > div > div.right_col > div.rows > span.title').innerHTML.replace(/<!---->|\n/g, '');
//                 var titleClean = title.replace(/ {1,}/g, ' ').trim();
//                 let price = document.querySelector('#feed_item_' + i + ' > div > div.left_col > div.price').innerText;
//                 let rooms = document.querySelector('#feed_item_' + i + ' > div > div.middle_col > div:nth-child(1) > span.val').innerText;
//                 let floor = document.querySelector('#feed_item_' + i + ' > div > div.middle_col > div:nth-child(2) > span.val').innerText;
//                 let size = document.querySelector('#feed_item_' + i + ' > div > div.middle_col > div:nth-child(3) > span.val').innerText;
//                 let thumbImg = document.querySelector('#image_' + i + ' > img').src;

//                 data.push({
//                     title: titleClean,
//                     price: price.replace('₪', '').trim(),
//                     rooms: rooms,
//                     floor: floor,
//                     size: size,
//                     thumbImg: thumbImg,
//                     liked: false
//                 })


//             } catch ( err ) {
//                 console.log(err)
//                 continue;
//             }
//         }

//         return {
//             data
//         }

//     });

//     // browser.close();
//     return result;
// };

// scrape2().then((value) => {
//     console.log(value); // Success!
//     allRes.push(value.data)
// });

//KOMO //

// rp(url)
//     .then(function(html) {
//         var match = html.match(/modaaRowDv\d+/g);
//         var results = [];
//         for (var i = 0; i < match.length; i++) {

//             let curr = match[i].replace('modaaRowDv', '');
//             let currTitle = '#modaaTitle' + curr
//             let title = $(currTitle, html).text()
//             let titleName = title.split(',')
//             let currThumb = '#tdGalleryLink' + curr
//             let thumb = $(currThumb, html).find('img')[0].attribs['data-lazy']
//             let currTable = '#modaaRow' + curr
//             let currPrice = $(currTable, html).find('td.tdPrice')[0].children[0].data
//             let currDetails = $(currTable, html).find('td.tdMoreDetails')[0].children[0].data
//             let currDetails2 = $(currTable, html).find('td.tdMoreDetails')[0].children[0].next.next.data
//             let sizePattern = /\(([^)]+)\)/
//             let roomsPattern = /\d+/g;
//             let sizeMatches = currDetails.match(sizePattern)
//             let size = sizeMatches[1].match(roomsPattern)[0]
//             let rooms = currDetails.match(roomsPattern)[0]
//             let floor = currDetails2.replace(/ {1,}|\n/g, ' ').trim()
//             let checkFloor = floor.indexOf('קרקע') != -1
//             let floorStr = checkFloor ? 'קרקע' : floor.match(roomsPattern)[0]
//             results.push({
//                 title: titleName[titleName.length - 1].replace(/ {1,}|\n/g, ' ').trim(),
//                 thumbImg: thumb,
//                 price: currPrice.replace(/\s/g, '').replace('₪', ''),
//                 size: size,
//                 rooms: rooms,
//                 floor: floorStr,
//                 liked: false
//             })


//         }
//         result = results
//         allRes.push(result)
//     //console.log(result)
//     })
//     .catch(function(err) {
//         console.log('err : ' + err)
//     });



app.get('/', (req, res) => res.send('Hello World!'))

app.get('/test', function(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://test.com');
    // res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.send(allRes);

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
