import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../cognito/cognito';
import { setIDToken, changePage } from '../../actions/sessionActions'
import './sidebar.css';
import dashboard_white from '../../img/dashboard_white.svg';
import dashboard_green from '../../img/dashboard_green.svg';
import teams from '../../img/teams.svg';
import team_green from '../../img/team_green.svg';
import imedia_new_white from '../../img/imedia_new_white.svg';
import imedia_green from '../../img/imedia_green.svg';
import route from '../../img/route.svg';
import logout_white from '../../img/logout_white.svg';

class Sidebar extends Component {

    state = {
        collapse: false,
        activeMenu: ['true', 'false', 'false', 'false'],
    }

    componentDidMount = () => {    
        if (this.props.currentPage === '')
            this.props.changePage('/dashboard');
    
        this.SignOut = this.SignOut.bind(this);
        
        if (this.props.idToken === '' || this.props.idToken === null || this.props.idToken === undefined){
            this.props.history.push("/")
              console.log("USER NOT FOUND");
          }else{
            console.log("USER LOGIN");
          }
    
        
    }

    clickBurgerBar() {
        // console.log("clickMenu" , this.sidebar);
        // this.sidebar.style.width = "61px";
        // (this.refs['res']).slideToggle();
        // console.log(this.collapse);
        
        // this.setState( currentState => ({ collapse: !currentState.collapse }), () => { //call back for get current value
        //     if(this.state.collapse === true) {
        //         // this.burger.style.width = "10px";
        //         this.sidebar.style.width = "61px";
        //     }
        // });

        this.setState({ collapse: !this.state.collapse});
        // console.log("burger ", this.burger);
        // console.log(this.state.collapse);
    }

    clickThisMenu(e) {
        // console.log(e);
        this.setState({
            activeMenu: this.state.activeMenu.map((name, index) => {
              if (index === e) {
                return this.state.activeMenu[e] = 'true';
              } else {
                return this.state.activeMenu[e] = 'false';
              }
            })
          });

    }

    SignOut = (e) => {
        e.preventDefault();
        if (!this.props.rememberMe){
            this.props.setIDToken('', '', '');
            console.log("NOT REMEMBER ME"+this.props.rememberMe)
        }else{
            this.props.setIDToken('', this.props.username, null);
        }
        this.props.changePage('')
        this.props.history.push('/');
        signOut();
        
    }

    render() {

        const collapse = this.state.collapse;
        const activeMenu = this.state.activeMenu;
        let div;

        if(!collapse) {
            div = (<div className="sidebar-expand" ref = { res => {this.sidebar = res} }>
            <table>
                <tbody>
                    <tr>
                        <td className="td-expand">
                            <div className="burgerBarGroup" onClick={ () => this.clickBurgerBar() }>
                                <div className="burgerBar">
                                </div>
                                <div className="burgerBar">
                                </div>
                                <div className="burgerBar">
                                </div>
                            </div>
                        </td>
                        <td className="td-expand" style={{ width: 100 + '%' }}>
                            <div className="auroraName">
                                <span style={{color: "#41C770" }}>A</span>
                                URORA
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td className="td-expand">
                            <div className="auroraVersion">
                                FRAMEWORK 0.1
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-expand">
                            <div className="imgCircle"></div>
                        </td> 
                    </tr>
                    <tr>
                        <td className="td-expand">
                            <div className="profileName" style={{ marginBottom: 70 + 'px' }}>
                            {this.props.username}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[0] === 'true' ? 'td-expand menu active' : 'td-expand menu'} onClick={ () => this.clickThisMenu(0) } index ="0">
                            <span style={{ color: 'white' }}></span>
                            <div className="topMenu" style={{ padding: 5 + 'px', paddingLeft: 18 + 'px' }}>
                                
                                { activeMenu[0] === 'true' ? 
                                <img src={dashboard_green} alt="dashboard"/> : 
                                <img src={dashboard_white} alt="dashboard"/> }
                                { activeMenu[0] === 'true' ? 
                                <span style={{ marginLeft: 10 + "px", color: "#41C770", verticalAlign: 'sub' }}>Dashboard</span> : 
                                <span style={{ marginLeft: 10 + "px", verticalAlign: 'sub'}}>Dashboard</span>}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[1] === 'true' ? 'td-expand menu active' : 'td-expand menu'} onClick={ (e) => this.clickThisMenu(1) } index ="1">
                            <div className="topMenu" style={{padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                                { activeMenu[1] === 'true' ? 
                                <img src={team_green} alt="team"/> : 
                                <img src={teams} alt="team"/> }
                                { activeMenu[1] === 'true' ? 
                                <span style={{ marginLeft: 10 + "px", color: "#41C770", verticalAlign: 'supesubr' }}>Team</span> : 
                                <span style={{ marginLeft: 10 + "px", verticalAlign: 'sub'}}>Team</span>}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-expand">
                            <div className="productMenu" style={{textAlign: "left", padding: 5 + 'px', paddingLeft: 18 + 'px', marginTop: 20 + 'px'}}>
                                Your Product
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-expand">
                            <div>
                                <hr className="hr-expand" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[2] === 'true' ? 'td-expand menu active' : 'td-expand menu'} onClick={ (e) => this.clickThisMenu(2) } index ="2">
                        <a href="http://localhost:3006/" target="_self"><div className="productMenu" style={{textAlign: "left", padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                            { activeMenu[2] === 'true' ? 
                                <img src={imedia_green} alt="imedia"/> : 
                                <img src={imedia_new_white} alt="imedia"/> }
                            { activeMenu[2] === 'true' ? 
                            <span style={{ marginLeft: 10 + "px", color: "#41C770", verticalAlign: 'sub' }}>iMedia Suite</span> : 
                            <span style={{ marginLeft: 10 + "px", verticalAlign: 'sub'}}>iMedia Suite</span>}
                            
                            </div>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[3] === 'true' ? 'td-expand menu active' : 'td-expand menu'} onClick={ (e) => this.clickThisMenu(3) } index ="3">
                            <div className="productMenu" style={{textAlign: "left", padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                            <img src={route} alt="idirectory"/> 
                            { activeMenu[3] === 'true' ? 
                            <span style={{ marginLeft: 10 + "px", color: "#41C770", verticalAlign: 'sub' }}>iDirectory</span> : 
                            <span style={{ marginLeft: 10 + "px", verticalAlign: 'sub'}}>iDirectory</span>}
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className="td-expand">
                            <div className="logout">
                                <hr className="hr-expand" />
                                <button type="button" className="btn" onClick={e => this.SignOut(e)}>
                                    <img src={logout_white} alt="logout"/> 
                                    <span className="text-white pl-2">Log Out</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div>
            </div>
        </div>)
        } else {
            div = (<div className="sidebar-collapse">
            <table>
                <tbody>
                    <tr>
                        <td className="td-collapse">
                            <div className="burgerBarGroup" onClick={ () => this.clickBurgerBar() }>
                                <div className="burgerBar-collapse" >
                                </div>
                                <div className="burgerBar-collapse" >
                                </div>
                                <div className="burgerBar-collapse" >
                                </div>
                            </div>
                        </td>
                        <td className="td-collapse" style={{ width: 100 + '%' }}>
                            <div className="auroraName-collapse">
                                <span style={{color: "#41C770" }}>A</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td className="td-collapse">
                            <div className="auroraVersion">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-collapse">
                            <div className="imgCircle-collapse"></div>
                        </td> 
                    </tr>
                    <tr>
                        <td className="td-collapse">
                            <div className="profileName" style={{marginTop: 110 + 'px',}}>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[0] === 'true' ? 'td-collapse menu active' : 'td-collapse menu'} onClick={ (e) => this.clickThisMenu(0) } index ="0">
                            <div className="topMenu-collapse" style={{ padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                            { activeMenu[0] === 'true' ? 
                                <img src={dashboard_green} alt="dashboard"/> : 
                                <img src={dashboard_white} alt="dashboard"/> }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[1] === 'true' ? 'td-collapse menu active' : 'td-collapse menu'} onClick={ (e) => this.clickThisMenu(1) } index ="1">
                            <div className="topMenu-collapse" style={{padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                            { activeMenu[1] === 'true' ? 
                                <img src={team_green} alt="team"/> : 
                                <img src={teams} alt="team"/> }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-collapse">
                            <div className="productMenu" style={{textAlign: "left", padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                                <span style={{display: 'none'}}>Your Product </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="td-collapse">
                            <div>
                                <hr className="hr-collapse" style={{marginTop: 44 + 'px'}} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[2] === 'true' ? 'td-collapse menu active' : 'td-collapse menu'} onClick={ (e) => this.clickThisMenu(2) } index ="2">
                            <div className="productMenu" style={{textAlign: "left", padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                            { activeMenu[2] === 'true' ? 
                                <img src={imedia_green} alt="imedia"/> : 
                                <img src={imedia_new_white} alt="imedia"/> }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={ activeMenu[3] === 'true' ? 'td-collapse menu active' : 'td-collapse menu'} onClick={ (e) => this.clickThisMenu(3) } index ="3">
                            <div className="productMenu" style={{textAlign: "left", padding: 5 + 'px', paddingLeft: 18 + 'px'}}>
                            <img src={route} alt="idirectory"/> 
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className="td-collapse">
                            <div className="logout-collapse">
                                <hr className="hr-collapse" />
                                <img src={logout_white} alt="logout"/>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div>
            </div>
        </div>)
        }

        return <div>{div}</div> 
        
    }
        
            
}


const mapStateToProps = (state) => {
    let { productRoles, productName, roleName, allUsers, userInformation,username,idToken} = state.sessionReducer
    let { currentPage, rememberMe } = state.sessionReducer
  
    return {
      productRoles: productRoles,
      productName: productName,
      roleName:roleName,
      allUsers: allUsers,
      userInformation: userInformation,
      username: username,
      idToken: idToken,
      rememberMe: rememberMe,
      currentPage: currentPage,
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    setIDToken: (idToken, username, password) => dispatch(setIDToken(idToken, username, password)),
    changePage: currentPage => dispatch(changePage(currentPage))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);