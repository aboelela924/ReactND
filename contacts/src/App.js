import React, { Component } from 'react';
import ContactList from "./ContactList"
import CreateContact from "./CreateContact"
import {getAll, remove} from "./utils/ContactsAPI"



class App extends Component{

  state = {
    screen:"display", 
    contacts: []
  }

  componentDidMount(){
    getAll().then(contacts => {
      this.setState({contacts})
    })
  }

  onDeleteClick = (id) => { 
    this.setState((prevState) =>({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
    remove(id)
  }

  render(){
    return (
      <div>
        {this.state.screen === "display" && (
          <ContactList contacts={this.state.contacts} onDelete={this.onDeleteClick} onNavigate={()=>this.setState({screen:"create"})}/>
        )}
        {this.state.screen == "create" && (
          <CreateContact />
        )}
        
      </div>
    )
  }
}

export default App;
