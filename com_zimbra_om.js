/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License") +  you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



//constructors
function com_zimbra_om_handlerObject(){
}
com_zimbra_om_handlerObject.prototype = new ZmZimletBase();
com_zimbra_om_handlerObject.prototype.constructor =com_zimbra_om_handlerObject;

//variables

var validFromDate_value,validFromTime_value,validToDate_value,validToTime_value;
var selected_server,selected_username,selected_password;
var new_sid;
var server_text = ["server1","server2","server3","server4","server5"];
var server = [this.server1,this.server2,this.server3,this.server4,this.server5];
var server_baseurl_text = [this.server1_baseurl_text, this.server2_baseurl_text,this.server3_baseurl_text,this.server4_baseurl_text,this.server5_baseurl_text];
var server_baseurl = [this.server1_baseurl,this.server2_baseurl,this.server3_baseurl,this.server4_baseurl,this.server5_baseurl];
var server_username_text = [this.server1_username_text,this.server2_username_text,this.server3_username_text,this.server4_username_text,this.server5_username_text];
var server_username = [this.server1_username,this.server2_username,this.server3_username,this.server4_username,this.server5_username];
var server_password_text = [this.server1_password_text,this.server2_password_text,this.server3_password_text,this.server4_password_text,this.server5_password_text];
var server_password = [this.server1_password,this.server2_password,this.server3_password,this.server4_password,this.server5_password];


//handling clicks

// function to convert double clicks into single clicks
com_zimbra_om_handlerObject.prototype.doubleClicked=
	function(){
		this.singleClicked();
		}

		
com_zimbra_om_handlerObject.prototype.singleClicked = 
		function(){
				this._selectserverdisplay();
			}



//preferences dialog box
com_zimbra_om_handlerObject.prototype.menuItemSelected = function(){
    this.pView = new DwtListView({parent:this.getShell(), noMaximize:false});
    this.pView.setSize("520","350");



    var j = 0;
    for (i = 0;i<5;i++){
    server[i] = new DwtText ({parent:this.pView, name:server_text[i], id:server_text[i]});
    server[i].setText(server_text[i]);
    server[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server[i].setLocation(20,(35+j));
    

    server_baseurl_text[i] = new DwtText({parent:this.pView, name:server_text[i] + "_baseurl_text", id:server_text[i]+"_baseurl_text"});
    server_baseurl_text[i].setText("URL");
    server_baseurl_text[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server_baseurl_text[i].setLocation(20,(50+j));
    server_baseurl[i] = new DwtInputField ({parent:this.pView, name: server_text[i]+"_baseurl", id: server_text[i]+"_baseurl"});
    server_baseurl[i].setValue(this.getUserProperty(server_text[i]+"_baseurl"));
    server_baseurl[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server_baseurl[i].setLocation(20,(65+j));

    server_username_text[i] = new DwtText({parent:this.pView, name:server_text[i]+"username_text",id: server_text[i]+"username_text"});
    server_username_text[i].setText("username");
    server_username_text[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server_username_text[i].setLocation(200,(50+j));
    server_username[i] = new DwtInputField ({parent:this.pView, name: server_text[i]+"_username", id: server_text[i]+"_username"});
    server_username[i].setValue(this.getUserProperty(server_text[i]+"_username"));
    server_username[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server_username[i].setLocation(200,(65+j));

    server_password_text[i] = new DwtText ({parent:this.pView, name: server_text[i]+"_password_text", id:server_text[i]+"_password_text"});
    server_password_text[i].setText("password");
    server_password_text[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server_password_text[i].setLocation(380,(50+j));
    server_password[i] = new DwtInputField ({parent:this.pView, name: server_text[i]+"_password", id: server_text[i]+"_password"});
    server_password[i].setValue(this.getUserProperty(server_text[i]+"_password"));
    server_password[i].setPosition(DwtControl.ABSOLUTE_STYLE);
    server_password[i].setLocation(380,(65+j));
        j +=65;

    }
 
    this.pbDialog = this._createDialog({title:("pref"), view:this.pView, standardButtons: [DwtDialog.OK_BUTTON,DwtDialog.CANCEL_BUTTON]});
    this.pbDialog.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this,this._okBtnListenerpref));
    this.pbDialog.popup();

}



//preferences dialog box OK Button Listener
com_zimbra_om_handlerObject.prototype._okBtnListenerpref =
    function(){
        for (i=0;i<5;i++){
            this.setUserProperty(server_text[i]+"_baseurl",server_baseurl[i].getValue(),1);
            this.setUserProperty(server_text[i]+"_username",server_username[i].getValue(),1);
            this.setUserProperty(server_text[i]+"_password",server_password[i].getValue(),1);
        }
        this.pbDialog.popdown();
    }



//Calendar start date selector
com_zimbra_om_handlerObject.prototype.calendar_popup_startdate = function(){
	
			this._parentView = new DwtListView({parent:this.getShell(),noMaximize:false});
			this._parentView.setSize("250", "150");
			this._parentView.getHtmlElement().style.overflow = "auto";
            this._parentView.setPosition(DwtControl.RELATIVE_STYLE);

			this.calendar = new DwtCalendar({parent:this._parentView, name:"calendar", id: "calendar"});
 			this.omDlg = this._createDialog({title:("start_date_selector"), view:this._parentView, standardButtons : [DwtDialog.OK_BUTTON,DwtDialog.CANCEL_BUTTON]});
            this.omDlg.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this.startdate_calendar_okbtnlistener));
			this.omDlg.popup();
}

//Calendar start date dialog OK Button Listener
com_zimbra_om_handlerObject.prototype.startdate_calendar_okbtnlistener = function(){
            start_date = this.calendar.getDate();
            var start_date_string = start_date + " ";
            var start_date_string_array = start_date_string.split(" ");
            var start_date_final = start_date_string_array [0] + " " + start_date_string_array[1] + " " + start_date_string_array[2] + " " + start_date_string_array[3];
            this.meeting_start_date_box.setValue(start_date_final,true);
            this.omDlg.popdown();

}




//Calendar end date selector
com_zimbra_om_handlerObject.prototype.calendar_popup_enddate = function(){
			
			this._parentView = new DwtListView({parent:this.getShell(),noMaximize:false});
			this._parentView.setSize("250", "150");
			this._parentView.getHtmlElement().style.overflow = "auto";
            this._parentView.setPosition(DwtControl.RELATIVE_STYLE);

			this.calendar = new DwtCalendar({parent:this._parentView, name:"calendar", id: "calendar"});
 			this.omDlg = this._createDialog({title:"end_date_selector", view:this._parentView, standardButtons : [DwtDialog.OK_BUTTON]});
            this.omDlg.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this.enddate_calendar_okbtnlistener));
			this.omDlg.popup();

}


//Calendar end date selector OK Button Listener
com_zimbra_om_handlerObject.prototype.enddate_calendar_okbtnlistener = function(){
			//code for getting end date from the calendar and inserting it into the end date box
            end_date = this.calendar.getDate();
            var end_date_string = end_date + " ";
            var end_date_string_array = end_date_string.split(" ");
            var end_date_final = end_date_string_array [0] + " " + end_date_string_array [1] + " " + end_date_string_array[2] + " " + end_date_string_array[3];
            this.meeting_end_date_box.setValue(end_date_final,true);
            this.omDlg.popdown();
}


//Add room dialog box
com_zimbra_om_handlerObject.prototype.add_room_button_listener = function(){
    this.add_room_parentView = new DwtListView({parent:this.getShell(),noMaximize:false});
    this.add_room_parentView.setSize("450","250");
    this.add_room_parentView.getHtmlElement().style.overflow = "auto";
    this.add_room_parentView.setPosition(DwtControl.RELATIVE_STYLE);

    this.add_room_roomname_text = new DwtText ({parent:this.add_room_parentView, name: "add_room_roomname_text", id: "add_room_roomname_text"});
    this.add_room_roomname_text.setText("Room Name:");
    this.add_room_roomname_text.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.add_room_roomname_text.setLocation("20","20");

    this.add_room_roomname_box = new DwtInputField({parent:this.add_room_parentView, name: "add_room_roomname_box", id: "add_room_roomname_box"});
    this.add_room_roomname_box.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.add_room_roomname_box.setLocation("150","20");


    this.roomtype_text = new DwtText ({parent:this.add_room_parentView, name: "roomtype_text", id: "roomtype_text"});
    this.roomtype_text.setText("Room Type:");
    this.roomtype_text.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.roomtype_text.setLocation("20","50");


    this.roomtypes_conference = new DwtCheckbox({parent:this.add_room_parentView, name: "roomtype_conference", id:"roomtype_conference"});
    this.roomtypes_conference.setText(("Conference"));
    this.roomtypes_conference.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.roomtypes_conference.setLocation("20","80");

    this.roomtypes_audience = new DwtCheckbox({parent:this.add_room_parentView, name: "roomtype_audience" , id: "roomtype_audience"});
    this.roomtypes_audience.setText(("Audience"));
    this.roomtypes_audience.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.roomtypes_audience.setLocation("100","80");
    
    this.roomtypes_restricted = new DwtCheckbox({parent:this.add_room_parentView, name:"roomtype_restricted", id:"roomtype_restricted"});
    this.roomtypes_restricted.setText(("Restricted"));
    this.roomtypes_restricted.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.roomtypes_restricted.setLocation("180","80");
    
    this.roomtypes_interview = new DwtCheckbox({parent:this.add_room_parentView, name:"roomtype_interview", id:"roomtype_interview"});
    this.roomtypes_interview.setText(("Interview"));
    this.roomtypes_interview.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.roomtypes_interview.setLocation("260","80");
    
    
    this.comment_text = new DwtText({parent:this.add_room_parentView, name:"comment_text", id:"comment_text"});
    this.comment_text.setText("Comment:");
    this.comment_text.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.comment_text.setLocation("20","110");
    
    this.comment = new DwtInputField ({parent:this.add_room_parentView, name:"comment", id:"comment"});
    this.comment.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.comment.setLocation("150","110");

    this.noOfPartizipants_text = new DwtText ({parent:this.add_room_parentView, name: "noOfPartizipants_text", id:"noOfPartizipants_text"});
    this.noOfPartizipants_text.setText("No of Participants:");
    this.noOfPartizipants_text.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.noOfPartizipants_text.setLocation("20","140");

    this.noOfPartizipants_box = new DwtInputField ({parent:this.add_room_parentView, name: "noOfPartizipants_box", id:"noOfPartizipants_box"});
    this.noOfPartizipants_box.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.noOfPartizipants_box.setLocation("150","140");

    this.ispublic_checkbox = new DwtCheckbox ({parent:this.add_room_parentView, name:"ispublic_checkbox", id: "ispublic_checkbox"});
    this.ispublic_checkbox.setText(("Public"));
    this.ispublic_checkbox.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.ispublic_checkbox.setLocation("20","170");
    
    this.isModerated_checkbox = new DwtCheckbox({parent:this.add_room_parentView, name:"isModerated", id:"isModerated"});
    this.isModerated_checkbox.setText(("Moderated"));
    this.isModerated_checkbox.setPosition(DwtControl.ABSOLUTE_STYLE);
    this.isModerated_checkbox.setLocation("150","170");
    
    this.add_room_dialog = this._createDialog({title:("add_room"), view:this.add_room_parentView, standartButtons:[DwtDialog.OK_BUTTON]});
    this.add_room_dialog.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this._add_room_okButtonListener));
    this.add_room_dialog.popup();
}


//Add room dialog box OK Button Listener
com_zimbra_om_handlerObject.prototype._add_room_okButtonListener = function(){
	this.add_room_dialog.popdown();
    var room_name = this.add_room_roomname_box.getValue();
    var roomtypes_id, isPublic, isModerated;
   
    if (this.roomtypes_conference.isSelected() == 1){
    	roomtypes_id = 1;
    }
    else if (this.roomtypes_audience.isSelected() == 1){
    	roomtypes_id = 2;
    }
    else if (this.roomtypes_restricted.isSelected() == 1){
    	roomtypes_id = 3;
    }
    else if (this.roomtypes_interview.isSelected() == 1){
    	roomtypes_id = 4;
    }
    
    var numberOfPartizipants = this.noOfPartizipants_box.getValue();    
    if (this.ispublic_checkbox.isSelected() == 1){
    	isPublic = 1;
    }
    else {
    	isPublic = 0;
    }
    
    if (this.isModerated_checkbox.isSelected() == 1){
    	isModerated = 1;
    }
    else {
    	isModerated = 0;
    }
    

    var request_url = this.getURL("RoomService", "addRoomWithModeration" , {SID:new_sid, name:room_name, roomtypes_id:roomtypes_id , comment:"" , numberOfPartizipants:numberOfPartizipants, ispublic: isPublic, appointment:"0", isDemoRoom:"0", demoTime:"0", isModeratedRoom:isModerated});
   
    var url = ZmZimletBase.PROXY + AjxStringUtil.urlComponentEncode(request_url);
    AjxRpc.invoke(null, url, null , new AjxCallback(this, this.add_room_responseHandler), true);

}




//Add rooms response handler
com_zimbra_om_handlerObject.prototype.add_room_responseHandler=
	function(response){
			try{
				var room_id = response.xml.getElementsByTagName("ns:return"), new_room_id = [].map.call( room_id, function(node){
                    return node.textContent || node.innerText || "";
				}).join("");
				this.room_id.setValue(new_room_id,true);
				this.add_room_dialog.popdown();
				}catch(e){
						this._showErrorMsg(e);
						}
			    
}
				
com_zimbra_om_handlerObject.prototype.add_room_response_Dlg_listener = 
		function(){
			this.add_room_response_Dlg.popdown();
				}


//Server Select dialog box
com_zimbra_om_handlerObject.prototype._selectserverdisplay =
    function(){
            this._profile_parentView = new DwtComposite ({parent:this.getShell()});
            this._profile_parentView.getHtmlElement().style.overflow = "auto";
            this._profile_parentView.setPosition(DwtControl.RELATIVE_STYLE);
            com_zimbra_om_handlerObject.prototype.getHTML =
                function(){
                        strn = "";
                        for (var i=0;i<5;i++){
                            strn+= "<div><a href='#' id="+ "'link"+ (i+1) + "'"+">" + this.getUserProperty(server_text[i]+"_baseurl")+"</a></div>";
                        }
                    return(strn);
                }
            this._profile_parentView.getHtmlElement().innerHTML = this.getHTML();
            var link_server1,link_server2,link_server3,link_server4,link_server5,link_server1_arg,link_server2_arg,link_server3_arg,link_server4_arg,link_server5_arg;
            link_server = [link_server1,link_server2,link_server3,link_server4,link_server5];
            link_server_arg = [link_server1_arg,link_server2_arg,link_server3_arg,link_server4_arg,link_server5_arg];
            for (var j =0; j<5; j++){
                link_server[j] = document.getElementById('link'+(j+1));
                link_server_arg[j] = this.getUserProperty(server_text[j]+"_baseurl");
                link_server[j].onclick = AjxCallback.simpleClosure(this.get_session,this,this.getUserProperty(server_text[j]+ "_baseurl"));
            }
            this.profile_select_Dlg = this._createDialog({title:("Select Profile"), view:this._profile_parentView, standardButtons : [DwtDialog.OK_BUTTON]});
            this.profile_select_Dlg.popup();
    }



//Openmeetings dialog box
com_zimbra_om_handlerObject.prototype._displayDialog =
	function(){
			
			this._parentView = new DwtListView({parent:this.getShell(), noMaximize:false});
            this._parentView.setSize("500","400");
            this._parentView.getHtmlElement().style.overflow = "auto";
            this._parentView.setPosition(DwtControl.RELATIVE_STYLE);

            this.username_text = new DwtText({parent:this._parentView, name: "username_text", id:"username_text"});
            this.username_text.setText("Username:");
            this.username_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.username_text.setLocation(20,20);

            this.username_box = new DwtInputField ({parent:this._parentView, name:"username_box", id:"username_box"});
            this.username_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.username_box.setLocation(150,20);

            this.room_id_text = new DwtText ({parent:this._parentView, name:"room_id_text", id:"room_id_text"});
            this.room_id_text.setText("Room Id:");
            this.room_id_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.room_id_text.setLocation(20,50);

            this.room_id = new DwtInputField({parent:this._parentView, name:"room_id" , id:"room_id"});
            this.room_id.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.room_id.setLocation(150,50);

            this.add_room_button = new DwtButton({parent:this._parentView, name: "add_room_button", id: "add_room_button"});
            this.add_room_button.addSelectionListener(new AjxListener(this,this.add_room_button_listener));
            this.add_room_button.setText(("New Room"));
            this.add_room_button.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.add_room_button.setLocation(300,50);

            this.password_check_box = new DwtCheckbox({parent:this._parentView, name: "password_checkbox", id:"password_checkbox"});
            this.password_check_box.setText("Is Password Protected?");
            this.password_check_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.password_check_box.setLocation(20,80);
            
            this.password_text = new DwtText({parent:this._parentView, name:"text_password", id:"text_password"});
            this.password_text.setText("Invitation Password:");
            this.password_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.password_text.setLocation(20,110);

            this.password_box = new DwtInputField({parent:this._parentView, name: "password_box", id:"password_box"});
            this.password_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.password_box.setLocation(150,110);

            this.hash_value_text = new DwtText({parent:this._parentView, name: "hash_value_text", id:"hash_value_text"});
            this.hash_value_text.setText("Validity:");
            this.hash_value_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.hash_value_text.setLocation(20,140);

            this.checkbox1 = new DwtCheckbox({parent:this._parentView, name: "endless", id: "endless"});
            this.checkbox1.setText(("endless"));
            this.checkbox1.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.checkbox1.setLocation(20,170);

            this.checkbox2 = new DwtCheckbox({parent:this._parentView, name: "from_to_time", id: "from_to_time"});
            this.checkbox2.setText("From to Time");
            this.checkbox2.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.checkbox2.setLocation(120,170);

            this.checkbox3 = new DwtCheckbox({parent:this._parentView, name: "one_time", id: "one_time"})
            this.checkbox3.setText("One Time");
            this.checkbox3.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.checkbox3.setLocation(220,170);

            this.meeting_time = new DwtText({parent:this._parentView, name:"meeting_time_text", id:"meeting_time_text"});
            this.meeting_time.setText("Start Time:");
            this.meeting_time.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_time.setLocation(20,200);


            this.meeting_start_date_time = new DwtText ({parent:this._parentView, name:"meeting_start_date_text", id:"meeting_start_date_text"});
            this.meeting_start_date_time.setText("Date:");
            this.meeting_start_date_time.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_start_date_time.setLocation(20,230);

            this.meeting_start_date_box = new DwtInputField({parent:this._parentView, name:"meeting_start_date_box", id:"meeting_start_date_box"});
            this.meeting_start_date_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_start_date_box.setLocation(150,230);

            this.meeting_start_date_calendar_button = new DwtButton({parent:this._parentView, name: "meeting_start_date_calendar_button", id: "meeting_start_date_calendar_button"});
            this.meeting_start_date_calendar_button.addSelectionListener(new AjxListener(this, this.calendar_popup_startdate));
            this.meeting_start_date_calendar_button.setText("Select Date");
            this.meeting_start_date_calendar_button.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_start_date_calendar_button.setLocation(300,230);
        
            this.meeting_start_time_text = new DwtText ({parent:this._parentView, name:"meeting_start_time_text", id:"meeting_start_time_text"});
            this.meeting_start_time_text.setText("Time (hh:mm):");
            this.meeting_start_time_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_start_time_text.setLocation(20,260);
        
            this.meeting_start_time_box = new DwtInputField ({parent:this._parentView, name:"meeting_start_time_box", id:"meeting_start_time_box"});
            this.meeting_start_time_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_start_time_box.setLocation(150,260);

            this.meeting_end_date_text = new DwtText ({parent:this._parentView, name:"meeting_end_date_text", id:"meeting_end_date_text"});
            this.meeting_end_date_text.setText("End Time:");
            this.meeting_end_date_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_end_date_text.setLocation(20,290);

            this.meeting_end_date = new DwtText ({parent:this._parentView, name:"meeting_end_date", id:"meeting_end_date"});
            this.meeting_end_date.setText("Date:");
            this.meeting_end_date.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_end_date.setLocation(20,310);

            this.meeting_end_date_box = new DwtInputField ({parent:this._parentView, name: "meeting_end_date_box", id:"meeting_end_date_box"});
            this.meeting_end_date_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_end_date_box.setLocation(150,310);

            this.meeting_end_date_calendar_button = new DwtButton({parent:this._parentView, name: "meeting_end_date_calendar_button", id: "meeting_end_date_calendar_button"});
            this.meeting_end_date_calendar_button.addSelectionListener(new AjxListener(this, this.calendar_popup_enddate));
            this.meeting_end_date_calendar_button.setText("Select Date");
            this.meeting_end_date_calendar_button.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_end_date_calendar_button.setLocation(300,310);

            this.meeting_end_time_text = new DwtText ({parent:this._parentView, name:"meeting_end_time_text", id: "meeting_end_time_text"});
            this.meeting_end_time_text.setText("time (hh:mm):");
            this.meeting_end_time_text.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_end_time_text.setLocation(20,340);

            this.meeting_end_time_box = new DwtInputField ({parent:this._parentView, name:"meeting_end_time_box", id:"meeting_end_time_box"});
            this.meeting_end_time_box.setPosition(DwtControl.ABSOLUTE_STYLE);
            this.meeting_end_time_box.setLocation(150,340);

 			this.mainDlg = this._createDialog({title:("Openmeetings"), view:this._parentView, standardButtons : [DwtDialog.OK_BUTTON]});
			this.mainDlg.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(this, this.generateHash));
			this.mainDlg.popup();
				}


com_zimbra_om_handlerObject.prototype.getURL =
    function (service, func, o) {
        var result = selected_server + "services/" + service + "/" + func + "/?";
        if (o) {
            for (var key in o)
            {
                result += "&" + key + "=" + (o[key]);
            }
        }
        return (result);
    }

//get invitation hash request
com_zimbra_om_handlerObject.prototype.generateHash=
			function(){

                var username = this.username_box.getValue();
                var room_id = this.room_id.getValue();

                if (this.password_check_box.isSelected()==1){
                    isPasswordProtected =1;
                }
                else {
                    isPasswordProtected =0;
                }

                var invitationpass = this.password_box.getValue();
                validFromDate_value = this.meeting_start_date_box.getValue();
                validFromTime_value = this.meeting_start_time_box.getValue();
                validToDate_value = this.meeting_end_date_box.getValue();
                validToTime_value = this.meeting_end_time_box.getValue();

                validFromDate = "";
                validFromTime = "";
                validToDate = "";
                validToTime= "";
                if (this.checkbox1.isSelected() == 1){
                    valid = 1;
                }
                else if (this.checkbox2.isSelected() == 1){
                    valid = 2;
                    validFromDate = validFromDate_value;
                    validFromTime = validFromTime_value;
                    validToDate = validToDate_value;
                    validToTime = validToTime_value;
                }
                else if (this.checkbox3.isSelected() == 1){
                    valid =3;
                }
                this.mainDlg.popdown();
                this.profile_select_Dlg.popdown();

com_zimbra_om_handlerObject.prototype.date_format=
            function(str){
				if (str==""){
					return("");
				}
                var month;
                str_arr = str.split(" ");
                date = str_arr[2];
                year = str_arr[3];
                month_dict = {"Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6, "Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12};
                month = month_dict[str_arr[1]];
                return (date+"."+ month +"."+year);
            }

                var request_url = this.getURL("RoomService", "getInvitationHash",{SID:new_sid, username:username, room_id: room_id, isPasswordProtected:isPasswordProtected, invitationpass:invitationpass,valid:valid, validFromDate:this.date_format(validFromDate), validFromTime:validFromTime,validToDate:this.date_format(validToDate),validToTime:validToTime});
				var url = ZmZimletBase.PROXY + AjxStringUtil.urlComponentEncode(request_url);
				AjxRpc.invoke(null , url, null , new AjxCallback(this, this.generateHash_responseHandler), true);
		}


//getinvitationHash response handler
com_zimbra_om_handlerObject.prototype.generateHash_responseHandler =
			function(response){
				try{
					 invitationHash =response.xml.getElementsByTagName("ns:return"), new_invitationHash = [].map.call( sid, function(node){
                        return node.textContent || node.innerText || "";
                    }).join("");
					} catch(e){
							this._showErrorMsg(e);
						}
				var invitation_url = selected_server + '?invitationHash=' + new_invitationHash ;
                msg = "Timing: \n" + "Start Timing:" +  validFromDate_value + "  " + validFromTime_value + "\n" + "End Timing:" + validToDate_value + " " + validToTime_value + "\n" + invitation_url;
				this.new_message(msg);
			}
             
//getSession Request
com_zimbra_om_handlerObject.prototype.get_session=
			function(str){
                    for (i=0;i<5;i++){
                        if (str == this.getUserProperty(server_text[i]+"_baseurl")){
                            selected_server = this.getUserProperty(server_text[i]+"_baseurl");
                            selected_username = this.getUserProperty(server_text[i]+"_username");
                            selected_password = this.getUserProperty(server_text[i]+"_password");
                            break;
                        }
                    }

                get_session_url = this.getURL ("UserService", "getSession");

					var url = ZmZimletBase.PROXY + AjxStringUtil.urlComponentEncode(get_session_url);
                    AjxRpc.invoke(null, url, null , new AjxCallback(this, this._responseHandler) , true);
				}

				
//getSession request response Handler
com_zimbra_om_handlerObject.prototype._responseHandler=
		function(response){
				try{
					sid =response.xml.getElementsByTagName("ax24:session_id"),new_sid = [].map.call( sid, function(node){
                        return node.textContent || node.innerText || "";
                    }).join("");


                    this.login_user();
					}catch(e){
							this._showErrorMsg(e);
							}
        }


//loginUser request
com_zimbra_om_handlerObject.prototype.login_user = function(){
                var url = this.getURL ("UserService", "loginUser" , {SID:new_sid, username: selected_username, userpass:selected_password});
                var request_url = ZmZimletBase.PROXY + AjxStringUtil.urlComponentEncode(url);
				
                AjxRpc.invoke(null, request_url, null , new AjxCallback(this, this._reponseHandler1), true);
                this._displayDialog();
        }


//loginUser request response Handler
com_zimbra_om_handlerObject.prototype._responseHandler1= 
				function(response){
								//will have to check if the returned value is positive or negative. if negative show the  error message.
								try{
									var errorid= response.getElementsByTagName("return");
                                    this.get_rooms();
									}catch(e){
										this._showErrorMsg(e);
											}
								if (errorid < 0){
										this._notlogged(errorid);
									}
						}
						

//getErrorByCode request
com_zimbra_om_handlerObject.prototype._notlogged = function (errorid){

				var language_id = 1;

                var url = this.getURL ("UserService","getErrorByCode",{SID:new_sid, errorid:errorid,language_id:1});
                var request_url = ZmZimletBase.PROXY + AjxStringUtil.urlComponentEncode(url);
                AjxRpc.invoke(null, request_url, null , new AjxCallback(this, this._reponseHandler2), true);
								}


//getErrorByCode request response Handler							
com_zimbra_om_handlerObject.prototype._responseHandler2= 
				function(postCallback, response){
							// show the error message
							try {
								var msg = response.xml.getElementById("errmessage");
								this._showErrorMsg(msg);
								}catch(e){
									this._showErrorMsg(e);
									}
						}
			
			
//Response on failure
com_zimbra_om_handlerObject.prototype._showErrorMsg =
		function(msg){
				var msgDialog=appCtxt.getMsgDialog();
				msgDialog.reset();
				msgDialog.setMessage(msg,DwtMessageDialog.CRITICAL_STYLE);
				msgDialog.popup();
		};

//Error message
com_zimbra_om_handlerObject.prototype._showErrorMsg =
    function(msg) {
        var msgDialog = appCtxt.getMsgDialog();//get a message dialog
        msgDialog.reset(); // clean up earlier message
        msgDialog.setMessage(msg, DwtMessageDialog.CRITICAL_STYLE); //set new message
        msgDialog.popup();//display the dialog
    }

// Open new mail message
com_zimbra_om_handlerObject.prototype.new_message =
    function (msg) {
        var composeController = AjxDispatcher.run("GetComposeController");
        if (composeController) {
            var appCtxt = window.top.appCtxt;
            var zmApp = appCtxt.getApp();
            var newWindow = zmApp != null ? (zmApp._inNewWindow ? true : false) : true;
            var params = {action:ZmOperation.NEW_MESSAGE, inNewWindow:newWindow,
                toOverride:null, subjOverride:null, extraBodyText:msg, callback:null}
            composeController.doAction(params); // opens asynchronously the window.
            this.displayStatusMessage("trying");
        }
    }