        // Function to update the current time
        function updateCurrentTime() {
            const currentTimeElement = document.getElementById('currentTime');
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const seconds = currentTime.getSeconds().toString().padStart(2, '0');
            currentTimeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
        }

        // Function to add a medicine reminder
        function addReminder() {
            const medicineName = document.getElementById('medicineName').value;
            const reminderTime = document.getElementById('reminderTime').value;

			if (medicineName === '') {
				alert('Please enter the medicine name.');
				return;
			}

			if (reminderTime === '') {
				alert('Please enter the reminder time.');
				return;
			}
			
            // Create reminder item
            const reminderItem = document.createElement('li');
            reminderItem.classList.add('reminder-item');

            // Display the reminder information
            reminderItem.innerHTML = `
                <div>${medicineName} - ${reminderTime}</div>
                <button class="delete-btn" onclick="deleteReminder(this)">Delete</button>
            `;

            // Add the reminder to the list
            const remindersList = document.getElementById('reminders');
            remindersList.appendChild(reminderItem);

            // Set up the alarm for the reminder
            setupAlarm(reminderTime);

            // Clear input fields
            document.getElementById('medicineName').value = '';
            document.getElementById('reminderTime').value = '';
        }

        // Function to delete a reminder
        function deleteReminder(buttonElement) {
            const reminderItem = buttonElement.parentElement;
            const remindersList = document.getElementById('reminders');
            remindersList.removeChild(reminderItem);
        }

        // Function to set up the alarm for the reminder
        function setupAlarm(reminderTime) {
            const currentTime = new Date();
            const [hours, minutes] = reminderTime.split(':');
            const reminderDate = new Date();
            reminderDate.setHours(hours, minutes, 0, 0);

            // Calculate the time difference in milliseconds
            const timeDifference = reminderDate.getTime() - currentTime.getTime();

            // Set up the alarm
            if (timeDifference > 0) {
                setTimeout(() => {
                    // Play alarm sound
					var audio = new Audio('Med_sound.mp3');
					audio.play();
                    // alert('Time to take your medicine!');

                    setTimeout(() => {
						var confirmed = window.confirm('Time to take your medicine!');
						if (confirmed) {
							audio.pause();
							audio.currentTime = 0;
						}
					}, 100);
                }, timeDifference);
            }
        }

        // Update the current time every second
        setInterval(updateCurrentTime, 1000);

        // Update the current time immediately on page load
        updateCurrentTime();