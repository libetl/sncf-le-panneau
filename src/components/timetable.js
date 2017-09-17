import styles from '../css/app.css'
import Departure from './departure'
import Footer from './footer'
import LocationPrompt from './locationPrompt'
import Details from './details'
import React from 'react'
import {RefreshControl, ScrollView, Text, View} from 'react-native'
import PropTypes from 'prop-types'

export default class Timetable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <LocationPrompt displayLocationPrompt={this.props.displayLocationPrompt} suggestStations={this.props.suggestStations} done={this.props.parent.changeLocation} abortChangeLocation={this.props.parent.abortChangeLocation}/>
                <Details rowWidth={this.props.rowWidth} displayNowColon={this.props.displayNowColon} details={this.props.parent.state.departureDetails} onClose={this.props.parent.hideDetails}/>
                <ScrollView style={styles.scrollView} contentContainerStyle={{height: `${this.props.timetable.departures.length * 15}%`}}
                            refreshControl={ <RefreshControl refreshing={this.props.parent.state.currentlyUpdating || false} onRefresh={this.props.parent.updateLocation} /> }>
                {(!this.props.timetable.departures ? new Array(10) : this.props.timetable.departures).map((departure, i) =>
                    <Departure rows={this.props.timetable.departures.length} num={i} key={`departure${i}`} detailed={i <= 1}
                               odd={i % 2 === 0} departure={departure} detailsRow={i <= 1 ? i + 1 : undefined} parent={this.props.parent}
                               rowHeight={this.props.rowHeight} rowWidth={this.props.rowWidth}/>)}
                    <View style={styles.bottomPaddingAfterScrolldown}/>
                </ScrollView>
                <Footer station={this.props.timetable.station} displayNowColon={this.props.displayNowColon} askForALocation={this.props.parent.askForALocation} updateLocation={this.props.parent.updateLocation}/>
            </View>
        )
    }
}

Timetable.propTypes = {
    rowWidth: PropTypes.number,
    rowHeight: PropTypes.number,
    timetable: PropTypes.object,
    parent: PropTypes.object,
    displayNowColon: PropTypes.bool,
    displayLocationPrompt: PropTypes.bool
}
