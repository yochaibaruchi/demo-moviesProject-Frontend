import { Link, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import MemberCard from "./MemberCard"
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import httpService from "../httpService"

function Members() {
    const storeData = useSelector(state => state)
    const navigate = useNavigate()
    const [members, setMembers] = useState([])

    useEffect(() => {
        let array = storeData.members
        const auth = async () => {
            const resp = await httpService.Auth()
            if (!resp) {
                navigate('/')
            }
        }
        auth()
        setMembers(array)
    }, [storeData])



    return (
        <div>
            <NavBar />
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={"/Members"} aria-current="page" >Members</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/AddMember"} >Add Member</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="rounded mx-auto d-block">
                {members?.map((m, index) => {
                    return <MemberCard key={index} member={m} />
                })}
            </div>
        </div>
    )

}

export default Members