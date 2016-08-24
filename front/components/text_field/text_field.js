import React, {Component, PropsTypes} from 'react'
import TextField from 'material-ui/TextField';


module.exports = class HotTextField extends Component {

    // static propsTypes = {
    //     regexp: React.PropsTypes.string, //用于检验输入的正则表达式
    //     errorText: React.PropsTypes.string, //错误信息
    // }

    constructor(props){
        super(props);

        this.state = {
            showError: this.props.showError,
        }
        this.timeout = 0;

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showError: nextProps.showError
        })
    }

    render(){
        return (
            <TextField
                {...this.props}
                errorText={this.state.showError? this.props.errorText : ''}
                onChange={(event, res) => this._onTextChange(res)}
                />
        )
    }

    _onTextChange(res: String){
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() =>{
            if(this.props.regexp){
                let rgex = new RegExp(this.props.regexp);
                if (!rgex.exec(res)) {
                    this.setState({
                        showError: true
                    });
                    return ;
                } else {
                    this.setState({
                        showError: false
                    });
                }
            }
            this.props.onChange(res);

        }, 500);

    }
};
