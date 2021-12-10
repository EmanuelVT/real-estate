import React, { Component } from 'react';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			name: 'Joe'
		};
		this.loopListings = this.loopListings.bind(this);
	}
	loopListings() {
		var { listingsData } = this.props;
		console.log(listingsData);

		if (listingsData === undefined || listingsData.length == 0) {
			return 'Sorry your filter did not match any listings.';
		}

		return listingsData.map(listing => {
			//THIS IS THE BOX VIEW
			if (this.props.globalState.view == 'box') {
				return (
					<div className="col-md-3">
						<div className="listing">
							<div
								className="listing-img"
								style={{
									background: `url("${listing.image}") no-repeat center center`
								}}
							>
								<span className="Address">{listing.address}</span>
								<div className="details">
									<div className="image-column">
										<div className="user-img">
											<img src="https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
										</div>
									</div>

									<div className="details-column">
										<div className="user-details">
											<span className="user-name">Nina Smith</span>
											<span className="post-date">05/05/2017</span>
										</div>
										<div className="listing-details">
											<div className="floor-space">
												<i class="far fa-square"></i>
												<span>{listing.floorSpace} ft&sup2;</span>
											</div>
											<div className="rooms">
												<i class="fas fa-bed"></i>
												<span>{listing.rooms} rooms</span>
											</div>

											<div className="button">View Listings</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bottom-info">
								<span className="price">${listing.price}</span>
								<span className="location">
									<i class="fas fa-map-marker-alt"></i>{' '}
									<span>
										{listing.city}, {listing.state}
									</span>
								</span>
							</div>
						</div>
					</div>
				);
			} else {
				//THIS IS THE LONG VIEW
				return (
					<div className="col-md-12 col-lg-6">
						<div className="listing">
							<div
								className="listing-img"
								style={{
									background: `url("${listing.image}") no-repeat center center`
								}}
							>
								<span className="Address">{listing.address}</span>
								<div className="details">
									<div className="image-column">
										<div className="user-img">
											<img src="https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
										</div>
									</div>

									<div className="details-column">
										<div className="user-details">
											<span className="user-name">Nina Smith</span>
											<span className="post-date">05/05/2017</span>
										</div>
										<div className="listing-details">
											<div className="floor-space">
												<i class="far fa-square"></i>
												<span>{listing.floorSpace} ft&sup2;</span>
											</div>
											<div className="rooms">
												<i class="fas fa-bed"></i>
												<span>{listing.rooms} rooms</span>
											</div>

											<div className="button">View Listings</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bottom-info">
								<span className="price">${listing.price}</span>
								<span className="location">
									<i class="fas fa-map-marker-alt"></i>{' '}
									<span>
										{listing.city}, {listing.state}
									</span>
								</span>
							</div>
						</div>
					</div>
				);
			}
		});
	}
	clickedBtn = () => {};
	async test() {}
	render() {
		return (
			<section id="listings">
				<section className="search-area">
					<input type="text" name="search" onChange={this.props.change}></input>
				</section>

				<section className="sortby-area">
					<div className="results">
						{this.props.globalState.filteredData.length} results found
					</div>
					<div className="sort-options">
						<select
							name="sortby"
							className="sortby"
							onChange={this.props.change}
						>
							<option value="price-dsc">Lowest Price</option>
							<option value="price-asc">Highest Price</option>
						</select>

						<div className="view">
							<i
								className="fas fa-th-list"
								onClick={this.props.changeView.bind(null, 'long')}
							></i>
							<i
								className="fas fa-th"
								onClick={this.props.changeView.bind(null, 'box')}
							></i>
						</div>
					</div>
				</section>

				<section className="listings-results">
					<div className="row">{this.loopListings()}</div>
				</section>

				<section id="pagination">
					<ul className="pages">
						<li>Previous</li>
						<li className="active">1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>Next</li>
					</ul>
				</section>
			</section>
		);
	}
}
