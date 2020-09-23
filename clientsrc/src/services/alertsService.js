import Swal from "sweetalert2"
export default class NotificationService {
    static async confirmAction(text = "You won't be able to revert this!") {
        try {
            let res = await Swal.fire({
                title: "<span class='text-light'>Are You Sure?</span>",
                html: "<span class='text-light'>You won't be able to undo/revert this!</span>",
                icon: 'warning',
                iconColor: '#a7333e',
                showCancelButton: true,
                confirmButtonColor: '#a7333e',
                cancelButtonColor: '#adad4e',
                confirmButtonText: 'Yes, delete it!',
                background: '#456075ef'
            })
            if (res.value) {
                return true
            }
            return false
        } catch (error) {

        }
    }
}