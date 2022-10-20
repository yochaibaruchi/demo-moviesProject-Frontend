import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Main from './components/Main';
import Movies from './components/Movies';
import EditMember from './components/EditMember'
import Members from './components/Members';
import EditMovie from './components/EditMovie'
import AddMovie from './components/AddMovie';
import AddMember from './components/AddMember';
import LoneMember from './components/LoneMember';
import LoneMovie from './components/LoneMovie';
function App() {



  return (
    <div>
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='Main' element={<Main />} />
        <Route path='Movies' element={<Movies />} />
        <Route path='Members' element={<Members />} />
        <Route path='EditMember/:id' element={<EditMember />} />
        <Route path='EditMovie/:id' element={<EditMovie />} />
        <Route path='AddMovie' element={<AddMovie />} />
        <Route path='AddMember' element={<AddMember />} />
        <Route path='LoneMember/:id' element={<LoneMember />} />
        <Route path='LoneMovie/:id' element={<LoneMovie />} />
      </Routes>
    </div>
  );
}

export default App;
