
import help from '../assets/help.jpg';
import illustration from '../assets/illustration.jpeg';
import {  Link } from "react-router-dom";



function Home() {
 
return <>
        <div style={{ boxShadow: '1px 1px 1px rgb(189, 181, 181);' }}>
            <div style={{ display: 'flex;', justifyContent: 'space-between', }}>
                <div style={{ padding: '20px' }}>
                    <img src={help} width="150" />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ padding: '20px' }}>
                <Link to="/doctors">  Doctors </Link>
                </div>
                <div style={{ padding: '20px' }}>
                <Link to="/ambulances">   Ambulance</Link> 
                </div>
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: "center", paddingTop: '50px' }}>
            <img src={illustration} width="1000" />
        </div>
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <h1 style={{ fontWeight: 'bold' }}>
                Accident cases are increasing more nowadays. So this app needs to display the list of all nearby ambulance services and doctors based on location with one click.
            </h1>
        </div>
    </>
}

export default Home;