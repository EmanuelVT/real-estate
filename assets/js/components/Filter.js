import React, { Component } from 'react';

export default class Filter extends Component {
	constructor() {
		super();
		this.state = {
			name: 'Joe'
		};
		this.cities = this.cities.bind(this);
		this.homeTypes = this.homeTypes.bind(this);
		this.bedrooms = this.bedrooms.bind(this);
		this.extras = this.extras.bind(this);
	}
	componentWillMount() {
		this.props.populateAction();
		this.props.loadExtras();
	}
	cities() {
		if (this.props.globalState.populateFormsData.cities != undefined) {
			var { cities } = this.props.globalState.populateFormsData;
			console.log(cities);

			return cities.map(item => {
				return (
					<option key={item} value={item}>
						{item}
					</option>
				);
			});
		}
	}

	homeTypes() {
		if (this.props.globalState.populateFormsData.homeTypes != undefined) {
			var { homeTypes } = this.props.globalState.populateFormsData;

			return homeTypes.map(item => {
				return (
					<option key={item} value={item}>
						{item}
					</option>
				);
			});
		}
	}

	bedrooms() {
		if (this.props.globalState.populateFormsData.rooms != undefined) {
			var { rooms } = this.props.globalState.populateFormsData;

			return rooms.map(item => {
				return (
					<option key={item} value={item}>
						{item}
					</option>
				);
			});
		}
	}

	extras() {
		if (this.props.globalState.populateFormsData.extras != undefined) {
			var { extras } = this.props.globalState.populateFormsData;

			return extras.map(item => {
				return (
					<label htmlfor="extras">
						<span>{item}</span>

						<input
							name={item}
							value={item}
							key={item}
							type="checkbox"
							onChange={this.props.getExtra}
						/>
					</label>
				);
			});
		}
	}
	clickedBtn = () => {};
	async test() {}
	render() {
		return (
			<section id="filter">
				<div className="inside">
					<h4>Filter</h4>
					<label for="city">City</label>
					<select
						name="city"
						className="filters city"
						onChange={this.props.change}
					>
						<option value="All">All</option>
						{this.cities()}
					</select>

					<label for="homeType">Home Type</label>

					<select
						name="homeType"
						className="filters homeType"
						onChange={this.props.change}
					>
						<option value="All">All homes</option>
						{this.homeTypes()}
					</select>

					<label for="bedrooms">Bedrooms</label>

					<select
						name="rooms"
						className="filters rooms"
						onChange={this.props.change}
					>
						<option value="All">All rooms</option>
						{this.bedrooms()}
					</select>
					<div className="filters price">
						<span className="title">Price</span>
						<input
							type="text"
							name="min_price"
							className="min-price"
							onChange={this.props.change}
							value={this.props.globalState.min_price}
						/>
						<input
							type="text"
							name="max_price"
							className="max-price"
							onChange={this.props.change}
							value={this.props.globalState.max_price}
						/>
					</div>
					<div className="filters price floor-space">
						<span className="title">Floor Space</span>
						<input
							type="text"
							name="min_floor_space"
							className="min-floor-space"
							onChange={this.props.change}
							value={this.props.globalState.min_floor_space}
						/>
						<input
							type="text"
							name="max_floor_space"
							className="max-floor-space"
							onChange={this.props.change}
							value={this.props.globalState.max_floor_space}
						/>
					</div>
					<div className="filters extras">
						<span className="title">Extras</span>
						{this.extras()}
					</div>
				</div>
			</section>
		);
	}
}
