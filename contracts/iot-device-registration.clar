;; IoT Device Registration Contract

;; Define the structure for a device
(define-map devices
  { device-id: uint }
  {
    owner: principal,
    device-type: (string-ascii 64),
    location: (string-ascii 128),
    status: (string-ascii 16)
  }
)

;; Counter for device IDs
(define-data-var next-device-id uint u1)

;; Register a new device
(define-public (register-device (device-type (string-ascii 64)) (location (string-ascii 128)))
  (let
    (
      (device-id (var-get next-device-id))
    )
    (map-set devices
      { device-id: device-id }
      {
        owner: tx-sender,
        device-type: device-type,
        location: location,
        status: "active"
      }
    )
    (var-set next-device-id (+ device-id u1))
    (ok device-id)
  )
)

;; Get device information
(define-read-only (get-device (device-id uint))
  (map-get? devices { device-id: device-id })
)

;; Update device status
(define-public (update-device-status (device-id uint) (new-status (string-ascii 16)))
  (let
    (
      (device (unwrap! (map-get? devices { device-id: device-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get owner device)) (err u403))
    (ok (map-set devices
      { device-id: device-id }
      (merge device { status: new-status })
    ))
  )
)

;; Get total number of registered devices
(define-read-only (get-device-count)
  (- (var-get next-device-id) u1)
)

