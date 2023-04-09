import { NavLink } from "react-router-dom"
import "./LandingPage.css"

function LandingPage () {
  return (
    <>
      <div className="main-row">
        <div className="main-row-text">
          <h1>
            The people platform—Where interests become friendships
          </h1>
          <h3>
            Whatever your interest, from hiking and reading to networking and skill sharing,
            there are thousands of people who share it on Meetup. Events are happening every
            day—log in to join the fun.
          </h3>
        </div>
        <div className="main-row-image">
          <img src="./images/meetup-landing-page-img.jpg" alt="Meetup Landing Page" />
        </div>
      </div>

      <div className="secondary-row">
        <h2> How Meetup works </h2>
        <h3>Meet new people who share your interests through online and in-person events. It’s free to create an account.</h3>
      </div>
      <div className="landing-page-actions">
          <img className="see-all-groups-img" src="./images/see-all-groups-img.jpg" alt="See all groups" />
          <h4 className="see-all-groups-text"><NavLink exact to="/groups">See all groups</NavLink></h4>
          <h5 className="see-all-groups-description">Do what you love, meet others who love it, find your community. The rest is history!</h5>
          <img className="find-an-event-img" src="./images/find-an-event-img.jpg" alt="Find an event" />
          <h4 className="find-an-event-text"><NavLink exact to="/events">Find an event</NavLink></h4>
          <h5 className="find-an-event-description">Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</h5>
          <img className="start-a-new-group-img" src="./images/start-a-group-img.jpg" alt="Start a new group" />
          <h4 className="start-a-group-text">Start a new group</h4>
          <h5 className="start-a-group-description">You don’t have to be an expert to gather people together and explore shared interests.</h5>
      </div>
      <div className="sign-up-button">
        <button >Join Meetup</button>
    </div>
    </>
  )
}

export default LandingPage
