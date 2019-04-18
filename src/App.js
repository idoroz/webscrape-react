import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ApartmentBox from './components/ApartmentBox'
import './App.css';



class App extends Component {

    state = {
        results: []
    }

    componentDidMount() {
        axios.get(`/test`)
            .then(res => {
                const results = res.data;
                this.setState({
                    results
                });
            })
    }

    handleLike = (item) => {
        let itemImgURL = item.thumbImg
        let counters = [...this.state.results];
        let newResults = []

        for (let i = 0; i < counters.length; i++) {

            if (counters[i].thumbImg === itemImgURL) {

                if (counters[i].liked === true) {
                    counters[i].liked = false;
                } else {
                    counters[i].liked = true;
                }

            }

            newResults.push(counters[i])
        }


        this.setState({
            results: newResults,
        })
    }


    render() {

        let rows = this.state.results
        // rows.sort(() => Math.random() - 0.5)
        console.log(rows)
        return (
            <div className="App">
  <Paper>
          {rows.map(row => {
                return (
                    <ApartmentBox key={row.key}
                    thumbImg={row.thumbImg}
                    title ={row.title}
                    size = {row.size}
                    rooms = {row.rooms}
                    floor = {row.floor}
                    price = {row.price}
                    liked = {row.liked}
                    onLike = {this.handleLike}>
                    </ApartmentBox>
                );
            })}

    </Paper>
      </div>
        );
    }
}

export default App;
