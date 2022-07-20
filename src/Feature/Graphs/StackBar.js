import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const StackBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={['Aligned', 'In Progress', 'Not Aligned', 'Not Relevent']}
        indexBy="index"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat={{ format: ' >-', enabled: false }}
        colors={['#30cfb9', '#f9d479', '#ec2541', '#eaeaea']}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -50
        }}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', '1.1']] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                translateX: 57,
                translateY: -200,
                itemsSpacing: 0,
                itemWidth: 80,
                itemHeight: 350,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 9,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default StackBar