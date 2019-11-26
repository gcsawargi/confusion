import React, { Component } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History(props) {
    const historyInfo = 'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n\n\nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world\'s best cuisines in a pan.';
    return (        
        <Card
            title={props.title}>
            <Text style={{ margin: 10 }}>
                {historyInfo}
            </Text>
        </Card>
    );
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
      };

    render() {
        const { navigate } = this.props.navigation;

        const renderLeader = ({item, index}) => {
            return (
                    <ListItem 
                        style={{ paddingBottom: 10 }}
                        key={index}
                        title={item.name}
                        titleStyle={{fontWeight: 'bold'}}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ source: { uri: baseUrl + item.image }}}
                    />
            );
        };

        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History />
                        <Card
                            title='Corporate Leadership'>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        } else if (this.props.leaders.errorMessage) {
            return (
                <ScrollView>
                    <History title='Our History'/>
                    <Card title='Corporate Leadership' style={{paddingBottom: 20}}>
                        <Text>{this.props.leaders.errorMessage}</Text> 
                    </Card>
                </ScrollView>
            );
        } else return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <FlatList
                            data={this.props.leaders.leaders}
                            renderItem={renderLeader}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);