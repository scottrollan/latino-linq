import React, {Component} from 'react'

class PáginaJunta extends Component {
  state = {
    boardMembers: []
  }
  render () {
    let boardMembers = []
    const sanityClient = require('@sanity/client')
    const client = sanityClient({
      projectId: 'q4pr99l8',
      dataset: 'production',
      token: '',
      useCdn: true // `false` if you want to ensure fresh data
    })
    const query = `*[_type=='board'] | order(displayOrder asc)`
    client.fetch(query).then(member => {
      member.forEach(m => {
        boardMembers.push(m)
      })
      this.setState({boardMembers: boardMembers})
    })

    return (
      <section>
        {this.state.boardMembers.map((person, index) => {
          let imageArray = person.memberImage.asset._ref.split('-') // splits _ref into an array of length 4
          let imageUrl = `https://cdn.sanity.io/images/q4pr99l8/production/${imageArray[1]}-${imageArray[2]}.${imageArray[3]}?h=200&fit=max` // gives image <image id>-<original size>.<extension>
          return (
            <div key={index} style={{textAlign: 'justify', minHeight: '280px', margin: '0', padding: '30px 20%', background: person.displayOrder % 2 === 0 ? 'white' : 'black'}}
            >
              <h3 style={{color: person.displayOrder % 2 === 0 ? 'black' : 'white'}}>{person.name}, {person.titleEsp}</h3>
              <img
                src={imageUrl}
                alt=''
                style={{margin: person.displayOrder % 2 === 0 ? '0 0 10px 20px' : '0 20px 10px 0', float: person.displayOrder % 2 === 0 ? 'right' : 'left'}}
              />
              <p style={{color: person.displayOrder % 2 === 0 ? 'black' : 'white'}}>{person.bioEsp}</p>
            </div>
          )
        })}
      </section>
    )
  }
}

export default PáginaJunta
