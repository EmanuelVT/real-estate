import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Filter from './Filter.js';
import Listings from './Listings.js';
import listingsData from './data/listingsData.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			name: 'Joe',
			listingsData,
			city: 'All',
			homeType: 'All',
			rooms: 'All',
			min_price: 0,
			max_price: 1000000,
			min_floor_space: 0,
			max_floor_space: 50000,
			extras: '',
			filteredData: listingsData,
			populateFormsData: '',
			sortby: 'price-dsc',
			view: 'box',
			search: '',
			perks: []
		};

		this.change = this.change.bind(this);
		this.getExtra = this.getExtra.bind(this);
		this.filteredData = this.filteredData.bind(this);
		this.populateForms = this.populateForms.bind(this);
		this.changeView = this.changeView.bind(this);
		this.loadExtras = this.loadExtras.bind(this);
	}

	componentWillMount() {
		var listingsData = this.state.listingsData.sort((a, b) => {
			return a.price - b.price;
		});

		this.setState({
			listingsData
		});
	}

	change(event) {
		var name = event.target.name;
		var value =
			event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;
		this.setState(
			{
				[name]: value
			},
			() => {
				console.log(this.state);
				this.filteredData();
			}
		);
	}

	changeView(viewName) {
		this.setState({
			view: viewName
		});
	}

	getExtra(event) {
		if (event.target.checked) {
			var extra = event.target.value;
			console.log(extra);
			this.setState(
				{
					perks: [...this.state.perks, extra]
				},
				() => {
					console.log(this.state);
					this.filteredData();
				}
			);
		} else {
			var extra = event.target.value;
			var newPerks = [...this.state.perks];
			var indexOfExtra = newPerks.indexOf(extra);
			if (indexOfExtra > -1) {
				newPerks.splice(indexOfExtra, 1);
			}
			this.setState(
				{
					perks: newPerks
				},
				() => {
					console.log(this.state);
					this.filteredData();
				}
			);
		}
	}

	filteredData() {
		console.log('filtered data is executing');
		var newData = this.state.listingsData.filter(item => {
			return (
				item.price >= this.state.min_price &&
				item.price <= this.state.max_price &&
				item.floorSpace >= this.state.min_floor_space &&
				item.floorSpace <= this.state.max_floor_space
			);
		});

		if (this.state.city != 'All') {
			console.log(this.state.perks);
			newData = newData.filter(item => {
				console.log(item.city == this.state.city);
				return item.city == this.state.city;
			});
		}

		if (this.state.homeType != 'All') {
			newData = newData.filter(item => {
				return item.homeType == this.state.homeType;
			});
		}

		if (this.state.rooms != 'All') {
			newData = newData.filter(item => {
				return item.rooms == this.state.rooms;
			});
		}

		if (this.state.sortby == 'price-dsc') {
			newData = newData.sort((a, b) => {
				return a.price - b.price;
			});
		}

		if (this.state.sortby == 'price-asc') {
			newData = newData.sort((a, b) => {
				return b.price - a.price;
			});
		}

		if (this.state.search != '') {
			newData = newData.filter(item => {
				var city = item.city.toLowerCase();
				var searchText = this.state.search.toLowerCase();
				var n = city.match(searchText);

				if (n != null) {
					return true;
				}
			});
		}

		if (this.state.perks != '') {
			newData = newData.filter(item => {
				/*
				this.state.perks.forEach(perk => {
					
					
				});*/

				console.log('Perks is: ' + this.state.perks[0]);

				function isInExtras(perk) {
					return item.extras.includes(perk);
				}

				console.log(this.state.perks.every(isInExtras));

				return this.state.perks.every(isInExtras);

				/*
				this.state.perks.forEach(perk => {
					if (item.extras.includes(perk)) {
						console.log(item.address + ' has ' + perk);
						return item;
					}
				});*/
			});
		}

		this.setState({
			filteredData: newData
		});
	}

	loadExtras() {
		var extras = [];

		this.state.listingsData.forEach(item => {
			item.extras.forEach(extra => {
				extras.push(extra);
			});
		});

		extras = new Set(extras);
		extras = [...extras];

		this.setState({
			extras: extras
		});
	}

	populateForms() {
		//City
		var cities = this.state.listingsData.map(item => {
			return item.city;
		});

		cities = new Set(cities);
		cities = [...cities];

		cities = cities.sort();

		//homeType
		var homeTypes = this.state.listingsData.map(item => {
			return item.homeType;
		});

		homeTypes = new Set(homeTypes);
		homeTypes = [...homeTypes];

		homeTypes = homeTypes.sort();

		//rooms
		var rooms = this.state.listingsData.map(item => {
			return item.rooms;
		});

		rooms = new Set(rooms);
		rooms = [...rooms];

		rooms = rooms.sort();

		//extras

		var extras = [];

		this.state.listingsData.forEach(item => {
			item.extras.forEach(extra => {
				extras.push(extra);
			});
		});

		extras = new Set(extras);
		extras = [...extras];

		this.setState(
			{
				populateFormsData: {
					homeTypes,
					rooms,
					cities,
					extras
				}
			},
			() => {
				console.log(this.state);
			}
		);
	}

	clickedBtn = () => {};
	async test() {}
	render() {
		console.log(this.state.listingsData);
		return (
			<div>
				<Header />
				<section id="content-area">
					<Filter
						change={this.change}
						globalState={this.state}
						populateAction={this.populateForms}
						loadExtras={this.loadExtras}
						getExtra={this.getExtra}
					/>
					<Listings
						listingsData={this.state.filteredData}
						change={this.change}
						globalState={this.state}
						changeView={this.changeView}
					/>
				</section>
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
