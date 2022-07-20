import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

class GuagueChart extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    if((JSON.stringify(nextProps.guagueSize) !== JSON.stringify(this.props.guagueSize)
    || nextProps.value !== this.props.value
    )){
      return true
    }else return false
  }
  render() {
    const { guagueTitle, value, guagueSize,id } = this.props;
   
    return (
      <ReactSpeedometer
        width={guagueSize ? guagueSize.width : 220}
        height={guagueSize ? guagueSize.height : 160}
        paddingVertical={15}
        paddingHorizontal={55}
        value={parseInt(value)}
        segmentColors={["#1A65B8", "#2079DF", "#4D94E6", "#79AFEC", "#A6C9F2"]}
        currentValueText={guagueTitle}
        customSegmentLabels={[
          {
            text: "Project Conceptualisation",
            position: "OUTSIDE",
            color: "#969696",

            // paddingHorizontal: '10',
          },
          {
            text: "Budget Allocation",
            position: "OUTSIDE",
            color: "#969696",
          },
          {
            text: "Project Implementation",
            position: "OUTSIDE",
            color: "#969696",
          },
          {
            text: "Performance Monitoring",
            position: "OUTSIDE",
            color: "#969696",
          },
          {
            text: "Evaluation and Citizens Feedback",
            position: "OUTSIDE",
            color: "#969696",
          },
        ]}
        labelFontSize={"12"}
        ringWidth={25}
        needleHeightRatio={0.8}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={"#969696"}
        textColor={id=== "systemGuage"? "#fff" : "#088cd7"}
        valueTextFontSize={"16"}
      />
    );
  }
}
export default GuagueChart;
