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



    $("#add").on("click", function() {
        var taskText = window.prompt("Please Enter The Task Name").trim();
        if (taskText) {
            let newDelete = "<a class='delete' href=''></a>"
            let newEdit = "<a class='edit-button ui-btn ui-btn-icon-notext ui-icon-edit ui-btn-a' href=''></a>"
            $("<li><a class='" + taskText + "' href='#" + taskText + "'>" + taskText + "</a>" + newEdit + newDelete + "</li>").appendTo("[data-role='listview']");
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

            $("ul").on("click",".delete", function(ev) {
                var caller = ev.target || ev.srcElement
                caller.closest("li").remove() 
            })

        }
    });

    $("ul").on("click", ".edit-button", function() {
        var liElement = $(this).closest("li");
        var primerEnlace = liElement.find("a:first");
        primerEnlace.attr("contenteditable", "true").focus();
        // Esto para guardar en local storage primerEnlace.on("blur", function() {})
    })
    
}
