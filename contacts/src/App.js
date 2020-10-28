import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import ContactList from "./ContactList"
import CreateContact from "./CreateContact"
import {getAll, remove, create} from "./utils/ContactsAPI"



class App extends Component{

  state = {
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

  onCreateContact = (contact) => {
    create(contact).then(contact =>{ 
      this.setState(state =>({
        contacts: state.contacts.concat([contact])
      }))
      console.log(this.state)
    }
    )
  }

  render(){
    return (
      <div>
        <Route exact path="/" render={() => (
          <ContactList contacts={this.state.contacts} onDelete={this.onDeleteClick}/>
        )}/>
        <Route path="/create" render={({history}) => (
          <CreateContact onCreateContact={(contact) => {
            this.onCreateContact(contact)
            history.push("/")
          }}/>
        )}/>
        
      </div>
    )
  }
}

export default App;
