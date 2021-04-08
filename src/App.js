import React from 'react'
import { Checkbox, Repeatable, Text, Textarea, Select, Rating } from './components';
import Loading from './components/Loading';
import api from './mockApi'
const data = require('./mockApi/data.json')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: '',
        rating: 0,
        year: null,
        description: '',
        upcoming: true, 
        cast: [],
      },
      loading: false,
      message: '',
      flash:'',
      success:null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.Input = this.Input.bind(this)
  }

  /**
   * 
   */
  handleChange(delta) {
    this.setState(({ data }) => ({ data: { ...data, ...delta }}))
  }

  /**
   * 
   */
  async handleUpdate(publish = false) {
    const { data } = this.state

    // timer function to have flash message disappear from the UI
    const timer = () => {
      setTimeout(()=>{
        this.setState({
          ...this.state,
          flash:''          
        })
      },1500)
    }

    // made a try/catch for the response from the API. The API payload will show the status and message depending
    // on the rejection or resolve in the API promise
    try {
      const results = await api.post({ ...data, publish })
      let { success, payload} = results;

      this.setState({
        ...this.state,
        message: payload,
        success,
        flash: payload
      })
      timer()  
        
    } catch (error) {
      let { success, payload} = error;

      this.setState({
        ...this.state,
        message: payload,
        success,
        flash: payload
      })
      timer()
    }
  }

  /**
   * added a conditional statement to fix the checkbox error. If multiple checkboxes are used then an alternative approach
   * would be required. By only toggling the value parameter it didn't work. It turned into a string and did not have 
   * the ability to toggle back and forth. By accessing the state directly in these cases it rectified the problem. I also
   * added a checked attribute to the checkbox so that the checkbox initially matches with the state.
   */
  Input({ children, iterable, label, id }) {
    const handleChange = value => {

      if(id === 'upcoming'){
        this.handleChange({ [id]: !this.state.data[id] });
      } else {
        this.handleChange({ [id]: value })
      }
    }

    const value = this.state.data[id]
    let props = {}

    if(iterable) {
      props = {
        id,
        value,
        onCreate: (item) => handleChange([...value, {
          ...item,
          id: Math.floor(Math.random() * 100000),
        }]),
        onUpdate: (item) => handleChange(value.map(prev => {
          if(item.id === prev.id) {
            return item
          }
          return prev
        })),
        onDelete: (id) => handleChange(value.filter(prev => prev.id !== id))
      }
    } else {
      props = {
        id,
        value,
        onBlur: () => this.handleUpdate(false),
        onChange: e => handleChange(e.target.value),
      }
    }
    return (
      <div className="Form-Group">
        <div className="Form-Label">{label}</div>
        {children(props)}
      </div>
    )
  }
  
  // made a message component that renders the message after the result of the API post response. Added styles 
  // to show red and green depending on the success of the API call
  MessageBox({ state }) {  
    return <h3 className={ state.success ? 'success' : 'danger'} >{state.flash}</h3>;
  }

  // made a hook for when the UI initially renders. It fetches data from the API randomly. When fetched the data
  // will populate the form. 
  componentDidMount(){
    
    // gets a random movie id to pass as an argument when loaded
    const randomMovieSelector = Math.ceil(Math.random() * Object.keys(data).length)
    // randomly selects whether data will be passed to the frontend or not
    const willLoad = Math.floor(Math.random() * 2)

    this.setState({
      ...this.state,
      loading: true
    })
    
    // fetch request for the data
    const fetchData = async(id) => {
      const response = await api.get(id);
      if(response){
        this.setState({
          data: response,
          loading: false
        })
      }

    }

    // shows the populated form or will load with an empty form
    if(willLoad){
      fetchData(randomMovieSelector)
    } else {
      this.setState({
        ...this.state,
        loading:false
      })
    }
  }

  render() {
    // added the MessageBox component within the render
    const { Input, MessageBox } = this

    // added this conditional render depending on whether the state is loading
    if(this.state.loading){
      return(
        <Loading></Loading>
      )
    } else {
      return (
        <div className="Form">
          <Input label="Title" id="title">
            {props => <Text {...props} />}
          </Input>
          <Input label="Upcoming" id="upcoming">
            {props => <Checkbox {...props} />}
          </Input>
          <Input label="Description" id="description">
            {props => <Textarea {...props} />}
          </Input>
          <Input label="Cast" iterable id="cast">
            {props => <Repeatable {...props} />}
          </Input>
          <Input label="Year" id="year">
            {props => <Select {...props} />}
          </Input>
          <Input label="Rating" id="rating">
            {props => <Rating {...props} />}
          </Input>
          <button onClick={() => this.handleUpdate(true)}>
            {
              'Publish'
            }
          </button>
          <MessageBox 
            state={this.state}
          />
        </div>
      )
    }
  }
}

export default App
