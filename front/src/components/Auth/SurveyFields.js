import ReactDOM from 'react-dom';
import './dashboardPage.css';
import Avatar from 'react-avatar-edit';

const React = require('react');


export default class SurveyFields extends React.Component {

    constructor(props) {
        super(props);
        const src = "";
        this.state = {
            preview: null,
            src,
        };
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    }

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview})
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680) {
            alert("File is too big!");
            elem.target.value = "";
        } else {
            console.log(elem, this.state)
            const preview = elem.target.files[0];
            this.setState(() => ({preview}));
        }
    }

    render() {
        return (
            <div className="form">
                <h2 id="fullName">Choose Avatar</h2>
                <h6 id="email">You can skip this step</h6>
                <div id="password">
                    <Avatar style={{
                        border: "2px",
                        dashed: "rgb(151, 151, 151)",
                        borderRadius: "8px",
                        textAlign: "center",
                        width: "100%",
                        height: "100%"
                    }}
                            width={390}
                            height={295}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            onBeforeFileLoad={this.onBeforeFileLoad}
                            // onChange={this.onBeforeFileLoad}
                            src={this.state.src}
                    />
                    {/*<img src={this.state.preview} alt="Preview"/>*/}
                </div>
                <div id="buttons">
                    <button className="firstButt" onClick={this.props.previousStep}>Back</button>
                    <button className="secondButt" onClick={() => this.nextStep()}>Save &amp;
                        Continue
                    </button>
                </div>
            </div>
        )
    }

    nextStep() {
        this.props.changeInfo(this.state);
        this.props.nextStep();
    }
}
