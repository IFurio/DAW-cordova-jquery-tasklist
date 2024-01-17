/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    /*
    <!-- page 1 -->
    <div data-role="page" id="page1">
        <div data-role="header">
            <a href="#" data-icon="back" data-rel="back" title="Go back">Back</a>
            <h1>Page1</h1>
        </div>

        <div class="ui-content">
            <p>Page 1 content goes here</p>
        </div><!-- end page 1 content -->

        <div data-role="footer" data-position="fixed">
            <h1>Page1</h1>
        </div><!-- /footer -->
    </div><!-- /page1 -->
    */

    printLocalStorage();

    $("#add").on("click", function() {
        var taskText = window.prompt("Please Enter The Task Name").trim();
        if (taskText) {
            // set unique id and local storage
            var id = Math.random().toString(16).slice(2)
            localStorage.setItem(id, taskText)

            // set the li element
            let newDelete = "<a class='delete' href=''></a>"
            let newEdit = "<a class='edit-button ui-btn ui-btn-icon-notext ui-icon-edit ui-btn-a' href=''></a>"
            $("<li id='" + id + "'><a class='" + taskText + "' href='#" + taskText + "'>" + taskText + "</a>" + newEdit + newDelete + "</li>").appendTo("[data-role='listview']");
            $( "ul" ).listview( "refresh" );
            let newDiv = 
            "<div data-role='page' id='" + taskText + "'>" +
            "<div data-role='header'>" +
            "<a href='#' data-icon='back' data-rel='back' title='Go back'>Back</a>" +
            "<h1>" + taskText + "</h1>" + 
            "</div>" +
            "<div class='ui-content'>" +
            "<p>" + taskText + " Content</p>" +
            "</div>" +
            "<div data-role='footer' data-position='fixed'>" +
            "<h1>" + taskText + "</h1>" +
            "</div></div>";
            //$( newDiv ).appendTo("body");

            

        }
    });

    //Event listeners for the buttons
    $("ul").on("click",".delete", function(ev) {
        var caller = ev.target || ev.srcElement
        let liElementId = caller.closest("li").id;
        caller.closest("li").remove();
        localStorage.removeItem(liElementId);
    })

    $("ul").on("click", ".edit-button", function() {
        var liElement = $(this).closest("li");
        var primerEnlace = liElement.find("a:first");
        primerEnlace.attr("contenteditable", "true").focus();

        // You have leaved from edit. The editing is stoped and the localstorage updated
        primerEnlace.on("blur", function() {
            primerEnlace.attr("contenteditable", "false");
            console.log("has salido del edit.");
            localStorage.removeItem(liElement.attr('id'));
            localStorage.setItem(liElement.attr('id'), primerEnlace.text());
            
            $( "ul" ).listview( "refresh" );
        });
        
    });
}

function printLocalStorage () {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let id = localStorage.key(i);
            let taskText = localStorage.getItem(id);

            let newDelete = "<a class='delete' href=''></a>"
            let newEdit = "<a class='edit-button ui-btn ui-btn-icon-notext ui-icon-edit ui-btn-a' href=''></a>"
            $("<li id='" + id + "'><a class='" + taskText + "' href='#" + taskText + "'>" + taskText + "</a>" + newEdit + newDelete + "</li>").appendTo("[data-role='listview']");
        }
        $( "ul" ).listview( "refresh" );
    }
}
