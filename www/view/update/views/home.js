import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


module.exports = class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        };

    }


    handleExpandChange(expanded){
        this.setState({expanded: expanded});
    };

    handleToggle(event, toggle){
        this.setState({expanded: toggle});
    };

    handleExpand (){
        this.setState({expanded: true});
    };

    handleReduce(){
        this.setState({expanded: false});
    };

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
                       <CardHeader
                         actAsExpander={true}
                         showExpandableButton={true}
                       />
                        <img src='http://www.songxiaocai.com/images/logo.png' alt=""/>
                       <CardText>
                         <Toggle
                           toggled={this.state.expanded}
                           onToggle={this.handleToggle.bind(this)}
                           labelPosition='right'
                           label='the hot update service of HangZHou XiaoNong tech .Ltd'
                         />
                       </CardText>
                       <CardMedia
                         expandable={true}
                         overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                       >
                         <img src="http://www.anawalls.com/images/abstract/space-background-blue-dots.jpg" />
                       </CardMedia>
                       <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
                       <CardText expandable={true}>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                       </CardText>
                       <CardActions>
                         <FlatButton label="Expand" onTouchTap={this.handleExpand.bind(this)} />
                         <FlatButton label="Reduce" onTouchTap={this.handleReduce.bind(this)} />
                       </CardActions>
                     </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}
