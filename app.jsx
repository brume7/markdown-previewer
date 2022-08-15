class Textarea extends React.Component {
    constructor (props){
        super(props);
        this.state ={ 
            editorInput : '' 
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.successFn = this.successFn.bind(this);
    }
    componentDidMount (){
        $.ajax({
            url: "./defaultText.txt",
            type: "GET",
            dataType: "text",
            success: this.successFn,
            error: this.errorFn
          });
    }
      successFn(result) {
        console.log("Setting result");
        this.setState({
            editorInput : result
        })
      }
      
      errorFn(xhr, status, strErr) {
        console.log("There was an error!");
      }
    changeHandler(evt){
        evt.preventDefault();
        this.setState({
            editorInput: evt.target.value
        });
        
    }
    render(){
        return(
            <div className="container-fluid cf2">
            <div className="form-floating col-sm-6 mb-3">
                <label htmlFor="editor" >Editor</label>
                <textarea className="form-control" onChange={this.changeHandler} value={this.state.editorInput}  id="editor" ></textarea>
                </div>
                
                <div className="form-floating col-sm-7 mb-3">
                <label htmlFor="preview">Previewer</label>
                <div className="form-control" id="preview" dangerouslySetInnerHTML={{ __html: marked.parse(this.state.editorInput)}}></div>
                </div>
            </div>
            
        );
    }
}
class App extends React.Component{
    constructor (props){
        super(props);
    }
    render(){
        return(
            <Textarea/>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App/>
);