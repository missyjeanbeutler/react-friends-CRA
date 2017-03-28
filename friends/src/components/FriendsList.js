import React, { Component } from 'react';
import Friend from './Friend';
import friends from '../friends'

class FriendsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
            orderBy: 'name',
            order: 'ascending'
        }
    }

    handleChange(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {
        const friendsList = friends
        .filter(friend => {
            return friend.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
        })
        .sort((a, b) => {
            return a[this.state.orderBy] > b[this.state.orderBy]
        })
        .map(friend => {
            return  <Friend
                        currentLocation={friend.current_location || {}}
                        friendCount={friend.friend_count}
                        key={friend.$$hashKey}
                        name={friend.name}
                        pitureUrl={friend.pic_square}
                        status={friend.status ? friend.status.message : ''}
                    />

        });

        const displayFriends = this.state.order === 'ascending' ? friendsList : friendsList.slice().reverse();
        
        return (
            <div>
                <form className="form-inline searchForm" role="form">
                    <div className="form-group">

                        <input value={this.state.searchText} className="form-control" placeholder="Search For Friends" onChange={this.handleChange.bind(this, 'searchText')} />

                        <select value={this.state.orderBy} className="input-medium" onChange={this.handleChange.bind(this, 'orderBy')}>
                            <option value='name'>Name</option>
                            <option value='friend_count'>#Friends</option>
                        </select>

                        <select value={this.state.order} className="input-medium" onChange={this.handleChange.bind(this, 'order')}>
                            <option value='descending'>Descending</option>
                            <option value='ascending'>Ascending</option>
                        </select>

                    </div>
                </form>
                <ul>
                    {friendsList}
                </ul>
            </div> 

        )
    }
}

export default FriendsList;