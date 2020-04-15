import React, {Component} from 'react';
import Popup from "reactjs-popup";

class HelpTip extends Component {

    renderPopup = (minWidth, helpText) =>
    {
        return <Popup trigger={<i className="fa fa-info-circle mr-2"></i>}
               position={'top left'}
               contentStyle={{minWidth: minWidth, width: '95%'}}>

            <div className="card card-body"
                 style={{width: '100%', paddingBottom: '0px', backgroundColor: 'white', color: 'grey'}}
                 dangerouslySetInnerHTML={{ __html: helpText}}/>
        </Popup>
    };

  render()
  {
    const {label, helpText, name, position, minWidth, optional} = this.props;

    if (label)
    {
        return (
                <label htmlFor={name} style={{margin: label === undefined ? '0' : '8', width: '100%'}}>
                    {
                        position === 'left' &&
                        this.renderPopup(minWidth, helpText)
                    }
                    {label}
                    {
                        position === 'right' &&
                        <span> {this.renderPopup(minWidth, helpText)}</span>
                    }
                    {label && <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>}
                </label>
        )
    }
    else
        {
        return (
                <span> {this.renderPopup(minWidth, helpText)}</span>
        )
    }
  }
}

export default HelpTip;