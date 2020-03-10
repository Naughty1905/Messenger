import ReactDOM from 'react-dom';
import './dashboardPage.css';
import Avatar from 'react-avatar-edit';
import {storage} from '../../Firebase';

const React = require('react');


export default class SurveyFields extends React.Component {

    constructor(props) {
        super(props);
        const src = "";
        this.state = {
            preview: null,
            src,
            avatar: null,
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
            const preview = elem.target.files[0];
            this.setState(() => ({src: preview}));
        }
    }

    render() {
        return (
            <form className="form">
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
                            src={this.state.preview}
                    />
                </div>
                <div id="buttons">
                    <button className="firstButt" onClick={this.props.previousStep}>Back</button>
                    <button className="secondButt" onClick={() => this.nextStep()}>Save &amp;
                        Continue
                    </button>
                </div>
            </form>
        )
    }

    async stepBy() {
        const response = await fetch(this.state.preview);
        const blob = await response.blob();
        const uploadTask = storage.ref(`avatar/${this.state.src.name}`).put(blob);
        return new Promise(resolve => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progrss function ....
                    // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    // this.setState({ progress });
                    console.log(snapshot)
                },
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    // complete function ....
                    storage.ref('avatar').child(this.state.src.name).getDownloadURL().then(url => {
                        this.setState({avatar: url});
                        resolve()
                    })
                });
        })
    }

    async nextStep() {
        await this.stepBy();
        this.props.changeInfo(this.state);
        this.props.nextStep();
    }
}
