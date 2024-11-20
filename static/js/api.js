function getCustomerList() {
  fetch('/customer-list')
    .then(response => {
      return response.json()
    }).then((data) => {
      const dropdownMenu = document.getElementById('customerList')
      dropdownMenu.innerHTML = ''
      data.customer_lists.forEach(customer => {
        const customerItem = document.createElement('a')
        customerItem.className = 'dropdown-item'
        customerItem.href = `#${customer.id}` // Add link or ID here
        customerItem.textContent = customer.customer_name // Display customer name
        customerItem.addEventListener('click', function (event) {
          event.preventDefault()
          displayCustomerDetails(customer) // Pass the selected customer data
        })
        dropdownMenu.appendChild(customerItem)
      })
    }).catch(e => { console.log(e) })
}

function displayCustomerDetails(customer) {
  const customerDetailsDiv = document.getElementById('customerDetails')
  customerDetailsDiv.innerHTML = `
  <kbd class="mb-3">Customer Details <span style="color:yellow"> ${customer.customer_name} </span></kbd>
  <br />
  <div class="d-flex align-items-center mb-2 mt-2">
    <p class="mb-0 mr-2">ssh_ip</p>
    <code id="ssh_ip" class="mr-2">${customer.ssh_ip}</code>
    <button id="btn_ssh_ip" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('ssh_ip')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_ssh_ip" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'ssh_ip')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">ssh_account</p>
    <code id="ssh_account" class="mr-2">${customer.ssh_account}</code>
    <button id="btn_ssh_account" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('ssh_account')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_ssh_account" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'ssh_account')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">ssh_password</p>
    <code id="ssh_password" class="mr-2">${customer.ssh_password}</code>
    <button id="btn_ssh_password" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('ssh_password')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_ssh_password" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'ssh_password')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">mongo_host</p>
    <code id="mongo_host" class="mr-2">${customer.mongo_host}</code>
    <button id="btn_mongo_host" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('mongo_host')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_mongo_host" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'mongo_host')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">mongo_password</p>
    <code id="mongo_password" class="mr-2">${customer.mongo_password}</code>
    <button id="btn_mongo_password" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('mongo_password')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_mongo_password" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'mongo_password')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">redis_host</p>
    <code id="redis_host" class="mr-2">${customer.redis_host}</code>
    <button id="btn_redis_host" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('redis_host')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_redis_host" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'redis_host')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">redis_password</p>
    <code id="redis_password" class="mr-2">${customer.redis_password}</code>
    <button id="btn_redis_password" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('redis_password')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_redis_password" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'redis_password')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">minio_host</p>
    <code id="minio_host" class="mr-2">${customer.minio_host}</code>
    <button id="btn_minio_host" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('minio_host')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_minio_host" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'minio_host')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">minio_password</p>
    <code id="minio_password" class="mr-2">${customer.minio_password}</code>
    <button id="btn_minio_password" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('minio_password')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_minio_password" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'minio_password')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>
  <div class="d-flex align-items-center mb-2">
    <p class="mb-0 mr-2">notes</p>
    <code id="notes" class="mr-2">${customer.notes}</code>
    <button id="btn_notes" class="btn btn-sm btn-outline-secondary copy-btn" onclick="copyToClipboard('notes')">
    <i class="bi bi-clipboard"></i>Copy</button>
    <button id="btn_notes" class="btn btn-sm btn-outline-info edit-btn ml-2" onclick="edit('${customer.customer_name}', 'notes')">
    <i class="bi bi-clipboard"></i>Edit</button>
  </div>

  <!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times</span>
        </button>
      </div>
      <div class="modal-body">
        <input id='editValue' type="text" class="form-control"></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="saveEdit()">Save changes</button>
      </div>
    </div>
  </div>
</div>
  `
}

function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).innerText
  navigator.clipboard.writeText(textToCopy).then(() => {
    const copyBtn = document.querySelector(`#btn_${elementId}`)
    copyBtn.innerHTML = '<i class="bi bi-check"></i> Copied!'
    copyBtn.classList.remove('btn-outline-secondary')
    copyBtn.classList.add('btn-success')

    setTimeout(() => {
      copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copy'
      copyBtn.classList.remove('btn-success')
      copyBtn.classList.add('btn-outline-secondary')
    }, 1000)
  }).catch(err => {
    console.error("Failed to copy: ", err)
  })
}

function edit(customer, id_key) {
  // data-set
  const modalElement = document.getElementById('editModal')
  modalElement.querySelector('.modal-title').textContent = id_key
  modalElement.setAttribute('data-customer', customer)
  modalElement.setAttribute('data-keyname', id_key)
  const modal = new bootstrap.Modal(modalElement)
  modal.show()
}

function saveEdit() {
  const modalElement = document.getElementById('editModal')
  const customer = modalElement.getAttribute('data-customer')
  const keyname = modalElement.getAttribute('data-keyname')
  const inputValue = document.getElementById('editValue').value
  const editData = {
    customer,
    keyname,
    inputValue
  }
  fetch('/edit', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editData)
  })
    .then(res => {
      if (res.status === 200) {
        $('#editModal').modal('hide')
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
    })
    .catch(e => {
      console.log(e)
    })
}

document.addEventListener('DOMContentLoaded', getCustomerList)
