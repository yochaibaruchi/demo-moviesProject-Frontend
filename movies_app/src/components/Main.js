import React from "react";
import NavBar from "./NavBar";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import httpService from "../httpService";
function Main() {
    const navigate = useNavigate()
    const dispatch = useDispatch()



    useEffect(() => {
        const getMovies = async () => {
            const data = await httpService.getdataWithAuth('/movies')
            if (!data.auth) {
                navigate('/')
            } else {
                dispatch({ type: "getMovies", payload: data.myData })
            }

        }
        const getMembers = async () => {
            let resp = await httpService.getdataWithAuth('/members')
            if (!resp.auth) {
                navigate('/')
            } else {
                dispatch({ type: "getMembers", payload: resp.myData })
            }
        }
        getMembers()
        getMovies()
    }, [])




    const h1Style = {
        fontweight: "100",
        color: "white",
        textalign: "center",
        paddingbottom: "10px",
    }
    return (
        <div>
            <NavBar />
            <div className="container text-center ">
                <div className="row">
                    <div className="col">
                        <div style={{ backgroundColor: 'red', height: '75%', width: '50%' }} className="card text-center">
                            <h1 style={h1Style} >welcom to Movies.com! </h1>
                            <h1 style={h1Style} > here you wont find movies to watch. </h1>
                            <h1 style={h1Style} > only to subscribe to.</h1>
                        </div>
                    </div>
                    <div className="col">
                        <img style={{ width: '115%', height: '75%' }} alt="movies" src={"https://storage.googleapis.com/afs-prod/media/e53811360eed4b8ba26b5f635d703a7c/3000.jpeg"} />
                    </div>
                </div>
            </div>
        </div >
    )



}


export default Main;