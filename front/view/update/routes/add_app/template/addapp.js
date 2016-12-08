import React from 'react'
import {userAction, titleAction} from 'actions';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import DropZone from 'react-dropzone';
import {request} from 'tools';


const infoPlistRegex = new RegExp('Info.plist');

class AddApp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            completed: 0,//
            max: 100,
            appIcon: '',
        }
    }

    componentDidMount() {
        this.props.setTitle('添加应用');
    }

    _onDrop = (files) =>{
        let file = files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        console.log(reader);
        console.log(zip);


        let _this = this;
        reader.onload = (f) => {
            let arrayBuffer = reader.result;
            zip.createReader(new zip.ArrayBufferReader(arrayBuffer), function(zipReader) {
        		zipReader.getEntries((entries) => {
                    entries.map((item) => {
                        let fileName = item.filename;
                        if (fileName.indexOf('AppIcon60x60@3x.png') != -1) {
                            item.getData(new zip.Data64URIWriter(), (data) => {
                                // _this.refs['FileUpload'].
                                console.log(data);
                                request(
                                    '/update/app/transformpngandplist',
                                    {
                                        appIcon: data,
                                    },
                                    (res) => {
                                        console.log(res);
                                    },
                                    (err) => {
                                        console.log(err);
                                    }
                                )
                            })

                        } else if (fileName.indexOf('plist') != -1) {
                            console.log(fileName);
                            console.log(item);
                            item.getData(new zip.Data64URIWriter(), (data) => {
                                console.log(data);

                            })
                        }
                    })
        		});


        	}, onerror);
        };

    }

    render() {
        return (
          <div>
            <h2>AddApp</h2>
                <DropZone
                    ref='chooseAndUpload'
                    onDrop={this._onDrop}
                >
                    <div>drop app here</div>

                    <img src={this.state.appIcon} alt=""/>
                </DropZone>
          </div>
        )
    }

}

let setState = (state) => {
    return {
        userReducer: state.userReducer,
        titleReducer: state.titleReducer
    }
};

let setAction = (dispatch) => {
    return {
        logout: () => {dispatch(userAction.logout())},
        login: (userInfo) => dispatch(userAction.login(userInfo)),
        set: (userInfo) => dispatch(userAction.set(userInfo)),
        setTitle: (title) => dispatch(titleAction.setTitle(title))
    }
}
module.exports = connect(setState, setAction)(AddApp);
