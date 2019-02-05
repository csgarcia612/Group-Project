import React, { Component } from 'react'
import { connect } from 'react-redux';

class search_results extends Component {
    constructor(){
        super();
        this.state = {
            page: 0
        }
    }
    render() {
    console.log('----this.props search page', this.props.events)
    const eventsList = this.props.events.map(e => {
        return <p key={e.id}>{e.name}</p>
    })
    return (
      <div>
        {eventsList}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        events: state.events,
        // totalPages: state.totalPages
    }
}

export default connect(mapStateToProps)(search_results);
