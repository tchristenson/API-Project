


import styles from "./AboutMe.module.css"

function AboutMe({ isLoaded }){

	return (
        <div className={styles['container']}>
            <h2>Hi, my name is Tommy Christenson and thank you for visiting my website!</h2>
            <h2>I am an aspiring software engineer proficient in JavaScript, Python, HTML, CSS, SQL, Flask-SQLAlchemy, SQLite, PostgreSQL, React/Redux, Express, Sequelize, AWS, and Git</h2>
            <h2>Check out my <a className="about-link" href="https://github.com/tchristenson" target="_blank" rel="noopener noreferrer">Github</a> and <a className="about-link" href="https://www.linkedin.com/in/tommychristenson/" target="_blank" rel="noopener noreferrer">LinkedIn</a>!</h2>

        </div>
	);
}

export default AboutMe;
