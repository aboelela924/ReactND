import React, {Component} from 'react';
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"


class ContactList extends Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired, 
        onDelete: PropTypes.func.isRequired
    }

    state = {
        query: ""
    }

    

    onQueryChange = (value) => {
        this.setState({ 
            query: value.trim()
        })
    }

    resetQuery = () => {
        this.setState({
            query: ""
        })
    }

    render(){

        const {contacts, onDelete} = this.props
        const { query } = this.state


        let filteredContacts = []

        if(query){
            const matcher = new RegExp(escapeRegExp(query), "i")
            filteredContacts = contacts.filter(contact => matcher.test(contact.name))
        }else{
            filteredContacts = contacts
        }
        
        filteredContacts.sort(sortBy("name"))

        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input type="text" className="search-contacts" value={query} onChange={(event) => this.onQueryChange(event.target.value)}/>
                    <Link to="/create" className="add-contact"/>
                </div>
                {filteredContacts.length != contacts.length && (
                    <div className="showing-contacts">
                        <span>Now Showing {filteredContacts.length} of {contacts.length}</span>
                        <button onClick={this.resetQuery}>Show all</button>
                    </div>
                )}
                
                <ol className="contact-list">
                    {filteredContacts
                    .map((contact, index) => (
                        <li className="contact-list-item" key={contact.id}>
                            <div className="contact-avatar" style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button className="contact-remove" onClick={() => onDelete(contact.id)}>Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}
export default ContactList