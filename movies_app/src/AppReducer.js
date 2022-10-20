const AppReducer = (state = {
    members: [],
    movies: [],
    user: ""
}, action) => {
    switch (action.type) {

        //user functions:
        case "userName":
            return { ...state, user: action.payload }
        //movies functions:
        case "getMovies":
            return { ...state, movies: action.payload }
        case "deleteMovie":
            let arr = [...state.movies]
            let arr3 = [...state.members]
            arr3.forEach(x => {
                let moviesNew = x.Movies.filter(x => x._id !== action.payload)
                x.Movies = moviesNew
            })
            let index = arr.findIndex(x => x._id === action.payload)
            if (index >= 0) {
                arr.splice(index, 1)
            }
            return { ...state, movies: arr, members: arr3 }
        case "updateMovie":
            let movieArr = [...state.movies]
            let movieIndex = movieArr.findIndex(x => x._id === action.payload._id)
            if (movieIndex >= 0) {
                movieArr[movieIndex].Name = action.payload.Name
                movieArr[movieIndex].Genres = action.payload.Genres
                movieArr[movieIndex].Img = action.payload.Img
                movieArr[movieIndex].premiered = action.payload.premiered
            }
            return { ...state, movies: movieArr }
        case "AddMovie":
            return { ...state, movies: [...state.movies, action.payload] }
        // members functions:

        case "getMembers":
            return { ...state, members: action.payload }

        case "deleteMember":
            let memberNewArr = [...state.members]
            let memberIndex = memberNewArr.findIndex(x => x._id === action.payload)
            if (memberIndex >= 0) {
                memberNewArr.splice(memberIndex, 1)
                let movieNewArr = [...state.movies]
                movieNewArr.forEach(x => {
                    let result = x.members.filter(x => x._id !== action.payload)
                    x.members = result
                })
                return { ...state, movies: movieNewArr, members: memberNewArr }
            }
        case "updateMember":
            let memArray = [...state.members]
            let memIndex = memArray.findIndex(x => x._id === action.payload._id)
            if (memIndex >= 0) {
                memArray[memIndex].Email = action.payload.Email
                memArray[memIndex].City = action.payload.City
                memArray[memIndex].Name = action.payload.Name
            }
            return { ...state, members: memArray }
        case "addMember":
            return { ...state, members: [...state.members, action.payload] }

        case "subs":
            let membersArray = [...state.members]
            let moviesArray = [...state.movies]
            let membersIndex = membersArray.findIndex(x => x._id === action.payload.MemberID)
            let moviesIndex = moviesArray.findIndex(x => x._id === action.payload.MovieID)
            if (membersIndex >= 0 && moviesIndex >= 0) {
                moviesArray[moviesIndex].members.push({
                    _id: membersArray[membersIndex]._id,
                    Name: membersArray[membersIndex].Name,
                    Date: action.payload.Date

                })
                membersArray[membersIndex].Movies.push({
                    _id: moviesArray[moviesIndex]._id,
                    Name: moviesArray[moviesIndex].Name,
                    Date: action.payload.Date
                })

            }
            return { ...state, movies: moviesArray, members: membersArray }
        default:
            return state;
    }
}

export default AppReducer