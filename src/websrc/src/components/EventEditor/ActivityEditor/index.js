import React from 'react';
import $ from 'jquery';
import  'jquery-validation';
import EditorBase from '../EditorBase/EditorBase'

class ActivityEditor extends EditorBase {

  onRenderContent() {
    return (
      <div>
        <div className='inputBlock'>
          {this.getInputName('活动名称', true)}
          <div>
            <input name="name" className='newsNameInput' type="text"
                   placeholder="请输入活动名称, 最多40个字符" maxLength='40'/>
          </div>
        </div>
        <div className='inputBlock'>
          {this.getInputName('活动时间', true)}
          <div>
            {this.getDateInput()}
            <div className="invalidTimeError">活动时间不能为空且结束时间不能早于开始时间</div>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动地点', true)}
          <div>
            <input name="location" className='newsNameInput' type="text"
                   placeholder="请输入活动地点, 最多40个字符" maxLength='40'/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('主办方', true)}
          <div>
            <input name="organizer" className='newsNameInput' type="text"
                   placeholder="请输入主办方, 最多20个字符" maxLength='20'/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动嘉宾', false)}
          <div>
            <input name="guest" className='newsNameInput' type="text"
                   placeholder="请输入活动嘉宾, 最多40个字符" maxLength='40'/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动描述', true)}
          <div>
            <textarea name="description" className='newsDescriptionInput' type="text"
                      placeholder="请输入一句简短的宣传语, 最多100个字符" maxLength='100'/>
          </div>
        </div>
      </div>
    )
  }

  validateContent() {
    return (this.validateElement("input[name='location']")
    && this.validateElement("input[name='organizer']")
    && this.validateElement("textarea[name='description']"));
  }

  onSubmit() {
    let eventName = document.getElementsByName('name')[0].value;

    let startDay = document.getElementsByName('startDay')[0].value;
    let startHour = document.getElementsByName('startHour')[0].value;
    let startTime = startDay + " " + startHour;
    let endDay = document.getElementsByName('endDay')[0].value;
    let endHour = document.getElementsByName('endHour')[0].value;
    let endTime = endDay + " " + endHour;

    let location = document.getElementsByName('location')[0].value;
    let organizer = document.getElementsByName('organizer')[0].value;
    let guest = document.getElementsByName('guest')[0].value;
    let description = document.getElementsByName('description')[0].value;
    let selectedTemplateId = this.state.selectedTemplateId;
    let type = this.getEditorType();

    $.ajax({
      url: 'http://localhost:8080/v1/activities',
      type: 'post',
      xhrFields: {withCredentials: true},
      data: JSON.stringify({
        name: eventName,
        sponsor: organizer,
        startTime: startTime,
        endTime: endTime,
        guest: guest,
        description: description,
        location: location,
        imageURL: selectedTemplateId,
        type: type
      }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(data);
      },
      error: function (xhr, status, err) {
        console.error("error", status, err.toString());
      }
    });
  }

  getEditorType() {
    return 'SESSION';
  }
}

export default ActivityEditor
