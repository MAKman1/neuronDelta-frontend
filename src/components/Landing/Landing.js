/*! Developed by Alinon */
import React from "react";

import 'assets/landing/css/bootstrap.min.scoped.css';
import 'assets/landing/css/slick.scoped.css';
import 'assets/landing/css/magnific-popup.scoped.css';
import 'assets/landing/css/LineIcons.scoped.css';
import 'assets/landing/css/default.scoped.css';
import 'assets/landing/css/style.scoped.css';

import { Link } from "react-router-dom";

class Landing extends React.Component {
	componentDidMount(e) {

		const script1 = document.createElement("script");
		script1.src = "assets/landing/js/vendor/modernizr-3.6.0.min.js";
		script1.async = true;
		script1.onload = () => this.scriptLoaded();
		document.body.appendChild(script1);

		const script2 = document.createElement("script");
		script2.src = "assets/landing/js/vendor/jquery-1.12.4.min.js";
		script2.async = true;
		script2.onload = () => this.scriptLoaded();
		document.body.appendChild(script2);

		const script3 = document.createElement("script");
		script3.src = "assets/landing/js/bootstrap.min.js";
		script3.async = true;
		script3.onload = () => this.scriptLoaded();
		document.body.appendChild(script3);

		const script4 = document.createElement("script");
		script4.src = "assets/landing/js/popper.min.js";
		script4.async = true;
		script4.onload = () => this.scriptLoaded();
		document.body.appendChild(script4);

		const script5 = document.createElement("script");
		script5.src = "assets/landing/js/imagesloaded.pkgd.min.js";
		script5.async = true;
		script5.onload = () => this.scriptLoaded();
		document.body.appendChild(script5);

		const script6 = document.createElement("script");
		script6.src = "assets/landing/js/jquery.easing.min.js";
		script6.async = true;
		script6.onload = () => this.scriptLoaded();
		document.body.appendChild(script6);

		const script7 = document.createElement("script");
		script7.src = "assets/landing/js/scrolling-nav.js";
		script7.async = true;
		script7.onload = () => this.scriptLoaded();
		document.body.appendChild(script7);

		const script8 = document.createElement("script");
		script8.src = "assets/landing/js/slick.min.js";
		script8.async = true;
		script8.onload = () => this.scriptLoaded();
		document.body.appendChild(script8);

		const script9 = document.createElement("script");
		script9.src = "assets/landing/js/main.js";
		script9.async = true;
		script9.onload = () => this.scriptLoaded();
		document.body.appendChild(script9);
	}

	scriptLoaded() {
		window.A.sort();
	}


	render() {
		return (
			<>

				{/* <!--====== HEADER ONE PART START ======--> */}

				<header className="header-area">

					<div className="navbar-area navbar-one navbar-transparent">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<nav className="navbar navbar-expand-lg">
										<a className="navbar-brand" href="#">
											<img style={{ maxWidth: '150px', height: '75px' }} src={require("assets/landing/images/logo.png")} alt="Logo"></img>
										</a>

										<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation">
											<span className="toggler-icon"></span>
											<span className="toggler-icon"></span>
											<span className="toggler-icon"></span>
										</button>

										<div className="collapse navbar-collapse sub-menu-bar" id="navbarOne">
											<ul className="navbar-nav m-auto">
												<li className="nav-item active">
													<a className="page-scroll" href="#home">Home</a>
												</li>
												<li className="nav-item">
													<a className="page-scroll" href="#about">About</a>
												</li>
												<li className="nav-item">
													<a className="page-scroll" href="#pricing">Pricing</a>
												</li>
												<li className="nav-item">
													<a className="page-scroll" href="#contact">Contact</a>
												</li>
											</ul>
										</div>

										<div className="navbar-btn d-none d-sm-inline-block">
											<ul>
												<li>
													<Link className="light" to={{ pathname: '/login' }}>Login</Link>
												</li>
												{/* </Link><a className="light" href="#">Login</a></li> */}
											</ul>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>

					<div id="home" className="header-content-area d-flex align-items-center">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="header-wrapper">
										<div className="header-content">
											<h3 className="header-title">Assent 360</h3>
											<p className="text">Compliance Management System. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque, porttitor laoreet neque. Mauris vitae turpis fringilla, imperdiet nulla eget, ullamcorper sapien. Curabitur ut metus suscipit, imperdiet justo ut, fringilla mauris. Proin dolor nulla, consectetur a dolor vitae, tempor tempor sem. Maecenas ornare tincidunt tincidun</p>
											<div className="header-btn rounded-buttons">
												<a className="main-btn rounded-one" href="https://google.com">Purchase Now</a>
											</div>

										</div>


									</div>
								</div>
							</div>
						</div>
						<div className="header-shape">
							<img src={require("assets/landing/images/header-shape.svg")} alt="shape"></img>
						</div>
					</div>
				</header>

				{/* <!--====== HEADER ONE PART ENDS ======--> */}

				{/* <!--====== FEATRES PART START ======--> */}

				<section id="features" className="features-area pt-60 pb-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-4 col-md-7 col-sm-9">
								<div className="single-features text-center mt-40">
									<div className="features-icon">
										<i className="lni-school-compass"></i>
										<img className="shape" src={require("assets/landing/images/f-shape-1.svg")} alt="Shape"></img>
									</div>
									<div className="features-content">
										<h4 className="features-title"><a href="#">Feature 1</a></h4>
										<p className="text">Short description about the feature!</p>
										<div className="features-btn rounded-buttons">
											<a className="main-btn rounded-one" href="#">KNOW MORE</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-7 col-sm-9">
								<div className="single-features text-center mt-40">
									<div className="features-icon">
										<i className="lni-construction"></i>
										<img className="shape" src={require("assets/landing/images/f-shape-1.svg")} alt="Shape"></img>
									</div>
									<div className="features-content">
										<h4 className="features-title"><a href="#">Feature 1</a></h4>
										<p className="text">Short description about the feature!</p>
										<div className="features-btn rounded-buttons">
											<a className="main-btn rounded-one" href="#">KNOW MORE</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-7 col-sm-9">
								<div className="single-features text-center mt-40">
									<div className="features-icon">
										<i className="lni-cup"></i>
										<img className="shape" src={require("assets/landing/images/f-shape-1.svg")} alt="Shape"></img>
									</div>
									<div className="features-content">
										<h4 className="features-title"><a href="#">Feature 1</a></h4>
										<p className="text">Short description about the feature!</p>
										<div className="features-btn rounded-buttons">
											<a className="main-btn rounded-one" href="#">KNOW MORE</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <!--====== FEATRES PART ENDS ======--> */}

				{/* <!--====== ABOUT THREE PART START ======--> */}

				<section id="about" className="about-area pt-70 pb-100">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="about-feature mt-30">
									<div className="about-feature-image">
										<img src={require("assets/landing/images/about.png")} alt="feature"></img>
									</div>
									<div className="about-feature-content">
										<h2 className="feature-title">The best compliance management software in the world</h2>
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque</p>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="about-feature-items d-sm-flex mt-30">
									<div className="feature-items-icon">
										<img src={require("assets/landing/images/feature-icon-1.png")} alt="Icon"></img>
									</div>
									<div className="feature-items-content media-body">
										<h5 className="items-title">Feature 1</h5>
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque</p>
									</div>
								</div>
								<div className="about-feature-items d-sm-flex mt-30">
									<div className="feature-items-icon">
										<img src={require("assets/landing/images/feature-icon-2.png")} alt="Icon"></img>
									</div>
									<div className="feature-items-content media-body">
										<h5 className="items-title">Feature 2</h5>
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque</p>
									</div>
								</div>
								<div className="about-feature-items d-sm-flex mt-30">
									<div className="feature-items-icon">
										<img src={require("assets/landing/images/feature-icon-3.png")} alt="Icon"></img>
									</div>
									<div className="feature-items-content media-body">
										<h5 className="items-title">Feature 3</h5>
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque</p>
									</div>
								</div>
								<div className="about-feature-items d-sm-flex mt-30">
									<div className="feature-items-icon">
										<img src={require("assets/landing/images/feature-icon-4.png")} alt="Icon"></img>
									</div>
									<div className="feature-items-content media-body">
										<h5 className="items-title">Feature 4</h5>
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <!--====== ABOUT THREE PART ENDS ======--> */}

				{/* <!--====== PRICING START ======--> */}

				<section id="pricing" className="pricing-area pt-95 pb-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-6">
								<div className="section-title text-center pb-20">
									<h4 className="title">Our Pricing Plan</h4>
									<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								</div>
							</div>
						</div>

						<div className="row justify-content-center">
							<div className="col-lg-4 col-md-7 col-sm-9">
								<div className="pricing mt-40">
									<div className="pricing-baloon">
										<img src={require("assets/landing/images/baloon.svg")} alt="baloon"></img>
									</div>
									<div className="pricing-header">
										<h5 className="sub-title">Basic</h5>
										<span className="price">$ 4.99</span>
										<p className="year">per month</p>
									</div>
									<div className="pricing-list">
										<ul>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
										</ul>
									</div>
									<div className="pricing-btn rounded-buttons text-center">
										<a className="main-btn rounded-one" href="#">GET STARTED</a>
									</div>
									{/* <div className="bottom-shape">
											<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35"><defs><style>.color-2{fill:#0067f4;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}</style></defs><title>bottom-part1</title><g><g data-name="Group 747"><path data-name="Path 294" className="cls-1 color-2" d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z" transform="translate(0 0)" /><path data-name="Path 297" className="cls-2 color-2" d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z" transform="translate(0 0)" /><path data-name="Path 296" className="cls-3 color-2" d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z" transform="translate(0 0)" /><path data-name="Path 295" className="cls-4 color-2" d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z" transform="translate(0 0)" /></g></g></svg>
										</div> */}
								</div>
							</div>

							<div className="col-lg-4 col-md-7 col-sm-9">
								<div className="pricing mt-40">
									<div className="pricing-baloon">
										<img src={require("assets/landing/images/baloon.svg")} alt="baloon"></img>
									</div>
									<div className="pricing-header">
										<h5 className="sub-title">Pro</h5>
										<span className="price">$ 7.99</span>
										<p className="year">per month</p>
									</div>
									<div className="pricing-list">
										<ul>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
										</ul>
									</div>
									<div className="pricing-btn rounded-buttons text-center">
										<a className="main-btn rounded-one" href="#">GET STARTED</a>
									</div>
									{/* <div className="bottom-shape">
											<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35"><defs><style>.color-2{fill:#0067f4;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}</style></defs><title>bottom-part1</title><g><g data-name="Group 747"><path data-name="Path 294" className="cls-1 color-2" d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z" transform="translate(0 0)" /><path data-name="Path 297" className="cls-2 color-2" d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z" transform="translate(0 0)" /><path data-name="Path 296" className="cls-3 color-2" d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z" transform="translate(0 0)" /><path data-name="Path 295" className="cls-4 color-2" d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z" transform="translate(0 0)" /></g></g></svg>
										</div> */}
								</div>
							</div>

							<div className="col-lg-4 col-md-7 col-sm-9">
								<div className="pricing mt-40">
									<div className="pricing-baloon">
										<img src={require("assets/landing/images/baloon.svg")} alt="baloon"></img>
									</div>
									<div className="pricing-header">
										<h5 className="sub-title">Enterprise</h5>
										<span className="price">$ 9.99</span>
										<p className="year">per month</p>
									</div>
									<div className="pricing-list">
										<ul>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detail</li>
											<li><i className="lni-check-mark-circle"></i> Detailt</li>
										</ul>
									</div>
									<div className="pricing-btn rounded-buttons text-center">
										<a className="main-btn rounded-one" href="#">GET STARTED</a>
									</div>
									{/* <div className="bottom-shape">
											<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35"><defs><style>.color-2{fill:#0067f4;isolation:isolate;}.cls-1{opacity:0.1;}.cls-2{opacity:0.2;}.cls-3{opacity:0.4;}.cls-4{opacity:0.6;}</style></defs><title>bottom-part1</title><g><g data-name="Group 747"><path data-name="Path 294" className="cls-1 color-2" d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z" transform="translate(0 0)" /><path data-name="Path 297" className="cls-2 color-2" d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z" transform="translate(0 0)" /><path data-name="Path 296" className="cls-3 color-2" d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z" transform="translate(0 0)" /><path data-name="Path 295" className="cls-4 color-2" d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z" transform="translate(0 0)" /></g></g></svg>
										</div> */}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <!--====== PRICING ENDS ======--> */}

				{/* <!--====== TESTIMONIAL PART START ======--> */}

				<section className="testimonial-area pt-95 pb-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-6">
								<div className="section-title text-center pb-20">
									<h4 className="title">Testimonial</h4>
									<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare leo tellus, ut semper erat accumsan nec. Etiam fermentum felis ut odio gravida tempus. Phasellus eu porttitor neque,</p>
								</div>
							</div>
						</div>

						<div className="row testimonial-active">
							<div className="col-lg-6">
								<div className="single-testimonial mt-30">
									<div className="testimonial-author d-sm-flex align-items-center">
										<div className="author-image">
											<img src={require("assets/landing/images/author-1.jpg")} alt="Author"></img>
										</div>
										<div className="author-name media-body">
											<h6 className="name">Name 1</h6>
											<span className="sub-title">Description 1</span>
										</div>
									</div>
									<div className="testimonial-text">
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta diam magna, eget ornare nisl pellentesque a. Curabitur tincidunt sollicitudin lacus</p>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="single-testimonial mt-30">
									<div className="testimonial-author d-sm-flex align-items-center">
										<div className="author-image">
											<img src={require("assets/landing/images/author-2.jpg")} alt="Author"></img>
										</div>
										<div className="author-name media-body">
											<h6 className="name">Name 2</h6>
											<span className="sub-title">Description 2</span>
										</div>
									</div>
									<div className="testimonial-text">
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta diam magna, eget ornare nisl pellentesque a. Curabitur tincidunt sollicitudin lacus</p>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="single-testimonial mt-30">
									<div className="testimonial-author d-sm-flex align-items-center">
										<div className="author-image">
											<img src={require("assets/landing/images/author-3.jpg")} alt="Author"></img>
										</div>
										<div className="author-name media-body">
											<h6 className="name">Name 3</h6>
											<span className="sub-title">Description 3</span>
										</div>
									</div>
									<div className="testimonial-text">
										<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta diam magna, eget ornare nisl pellentesque a. Curabitur tincidunt sollicitudin lacus</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <!--====== TESTIMONIAL PART ENDS ======--> */}

				{/* <!--====== CONTACT PART START ======--> */}

				<section id="contact" className="contact-area pt-95 pb-100">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-6">
								<div className="section-title text-center pb-20">
									<h4 className="title">Get in touch</h4>
									<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta diam magna, eget ornare nisl pellentesque a.</p>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-6">
								<div className="contact mt-30">
									<h4 className="contact-title">We love to hear from you. Let's talk?</h4>
									<p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam unde repellendus delectus facilis quia consequatur maxime perferendis! Sequi, modi consequatur. <br></br> <br></br> Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</p>
									<ul className="contact-info">
										<li><i className="lni-money-location"></i> 1234 Audin, USD</li>
										<li><i className="lni-phone-handset"></i> 009-215-5596</li>
										<li><i className="lni-envelope"></i> hello@assent360.com</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="contact-form form-style-one mt-15">
									<form id="contact-form" action="assets/landing/contact.php" method="post">
										<div className="form-input mt-15">
											<label>Name</label>
											<div className="input-items default">
												<input name="name" type="text" placeholder="Name"></input>
												<i className="lni-user"></i>
											</div>
										</div>
										<div className="form-input mt-15">
											<label>Email</label>
											<div className="input-items default">
												<input name="email" type="text" placeholder="Email"></input>
												<i className="lni-envelope"></i>
											</div>
										</div>
										<div className="form-input mt-15">
											<label>Message</label>
											<div className="input-items default">
												<textarea name="message" placeholder="Message"></textarea>
												<i className="lni-pencil-alt"></i>
											</div>
										</div>
										<p className="form-message"></p>
										<div className="form-input standard-buttons mt-20">
											<button className="main-btn standard-two" type="submit">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* <!--====== CONTACT PART ENDS ======--> */}

				{/* <!--====== FOOTER PART START ======--> */}

				<footer id="footer" className="footer-area">
					<div className="footer-widget pt-70 pb-100">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="footer-logo-support d-md-flex align-items-end justify-content-between">
										<div className="footer-logo d-flex align-items-end pt-30">
											<a href="index.html"><img src={require("assets/landing/images/footer-logo.png")} alt="Logo"></img></a>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xl-6 col-lg-4 col-sm-12">
									<div className="footer-support ">
										<span className="number">09-215-5596</span>
										<span className="mail">hello@assent360.com</span>
									</div>
									<ul className="social">
										<li><a href="#"><i className="lni-facebook-filled"></i></a></li>
										<li><a href="#"><i className="lni-twitter-original"></i></a></li>
										<li><a href="#"><i className="lni-instagram-original"></i></a></li>
										<li><a href="#"><i className="lni-linkedin-original"></i></a></li>
									</ul>
								</div>
								<div className="col-xl-2 col-lg-2 col-sm-4">
									<div className="footer-link">
										<h6 className="footer-title">Company</h6>
										<ul>
											<li><a href="#">About</a></li>
										</ul>
									</div>
								</div>
								<div className="col-xl-2 col-lg-3 col-sm-4">
									<div className="footer-link">
										<h6 className="footer-title">Pricing</h6>
										<ul>
											<li><a href="#">Pricing</a></li>
										</ul>
									</div>
								</div>
								<div className="col-xl-2 col-lg-3 col-sm-4">
									<div className="footer-link">
										<h6 className="footer-title">Help & Support</h6>
										<ul>
											<li><a href="#">Terms & Conditions</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="footer-copyright">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="copyright text-center">
										<p className="text">Copyrights | <a rel="nofollow" href="http://alinon.online">Alinon</a></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>

				{/* <!--====== FOOTER PART ENDS ======--> */}

				{/* <!--====== BACK TOP TOP PART START ======--> */}

				<a href="#" className="back-to-top"><i className="lni-chevron-up"></i></a>

				{/* <!--====== BACK TOP TOP PART ENDS ======--> */}

			</>
		);
	}
}

export default Landing;
