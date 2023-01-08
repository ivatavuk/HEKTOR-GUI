import React from "react";
import Container from "react-bootstrap/esm/Container";
import Plot from 'react-plotly.js';
import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import './GraphWindow.css';

//Class for constructing objects ment for plotting
class GraphDataCL {
    constructor(name, type, id) {
        this.y = [];
        this.name = name;
        this.type = type;
        this.id = id;
    }

    update(data_point) {
        this.y.push(data_point);
    }

    return_data() {
        return {
            y: this.y,
            name: this.name,
            type: this.type
        };
    }

    clear_plot_data() {
        this.y = [];
    }
};

function GraphWindow(props) {
    const [data, setData] = useState([]);
    const [start, setStart] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        //On load set list of objects used for graphical representation.
        let listOfGraphTopics = [];
        for (let i = 0; i < props.topicList.length; i++) {
            if (props.topicList[i][1].isGraphData) {
                listOfGraphTopics.push(new GraphDataCL(props.topicList[i][1].topicLable, 'line', props.topicList[i][1]._id));
            }
        }
        setGraphData(listOfGraphTopics);

    }, [props.topicList]);

    useEffect(() => {
        //Sample data for graph every 100ms.
        const interval = setInterval(() => {
            if (!freeze && start) {
                //List of data for display.
                let listOfGraphData = [];
                //Loop through graphData.
                for (let i = 0; i < graphData.length; i++) {
                    //Loop through topicList.
                    for (let j = 0; j < props.topicList.length; j++) {
                        //Search the graph data by topic id.
                        if (graphData[i].id === props.topicList[j][1]._id) {
                            //Update graphData from the data available on the topicList.
                            graphData[i].update(props.topicList[j][2]);
                            //Fill the list with updated objects.
                            listOfGraphData.push(graphData[i].return_data());
                        }
                    }
                }
                //Sets the data for ploting.
                setData(listOfGraphData);
            }

        }, 100);

        return () => clearInterval(interval);
    });

    //This function DIRECLY changes value
    const handleStart = () => {
        if (start) {
            //RESET
            setData([]);
            graphData.map((data) => {
                data.clear_plot_data();
            });
            setStart(false);
        } else {
            //SET
            setStart(true);
        }
    }

    const handleFreeze = () => {
        if (freeze) {
            setFreeze(false);
        } else {
            setFreeze(true);
        }
    }

    return (
        <Container className='text-light bg-dark rounded'>
            <div className="display_inline">
                <h5>Graph window</h5>
                <Button variant={start ? "danger" : "success"} onClick={handleStart}>{start ? "Reset" : "Start"}</Button>
                <Button variant={freeze ? "warning" : "primary"} onClick={handleFreeze}>{freeze ? "Unfreeze" : "Freeze"}</Button>
            </div>
            {/*BUG kod izoliranja jedne linije!*/}
            <Plot
                data={data}
                layout={{
                    xaxis: { fixedrange: true },
                    yaxis: { fixedrange: true },
                    margin: {
                        l: 50,
                        r: 50,
                        b: 50,
                        t: 50,
                        pad: 1
                    },
                    showlegend: true,
                    datarevision: { data }
                }}
                config={{
                    modeBarButtonsToRemove: ["lasso2d", "select2d"]
                }}
                useResizeHandler={true}
                style={{ "width": "100%", "height": "100%" }}
            />
            <br />
        </Container>
    );
}

export default GraphWindow;