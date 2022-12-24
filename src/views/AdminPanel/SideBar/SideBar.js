import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListMenu, {ListMenus} from './ListMenu'
import { useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '../services/UserAuthApi';
import { getToken, removeToken } from '../services/LocalStorageService';
import { unsetUserToken } from '../features/authSlice';


const SideBar = (props) => {
  const [inactive, setInactive] = useState(false);
  const [ logoutUser ] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = getToken();
  // console.log(token);
  
  const handleLogout = async () => {
    const res = await logoutUser({ token })
    console.log(res);
    if (res.data.status === "success") {
      dispatch(unsetUserToken({ token: null }))
      // dispatch(unsetUserInfo({ email: "", name: "" }))
      removeToken('token')
      navigate('/login')
    }
  }
  

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

 
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);


  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="">
          <span><b>Task</b></span>
          {/* <img src={logo} alt="webscript" /> */}
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

<div className='main-menu'>
<ul>
          {ListMenus.map((List, index) => (
            <ListMenu
              key={index}
              name={List.name}
              exact={List.exact}
              to={List.to}
              subMenus={List.subMenus || []}
              iconClassName={List.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
       
</ul>
</div>

<button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</button>

     
    </div>
  );
};

export default SideBar;