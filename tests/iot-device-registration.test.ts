import { describe, it, expect, vi } from "vitest"

// Mock contract calls
const mockContractCall = vi.fn()

describe("IoT Device Registration Contract", () => {
  it("should register a new device", async () => {
    mockContractCall.mockResolvedValueOnce({ result: { value: 1 } })
    
    const result = await mockContractCall("register-device", ["temperature-sensor", "city-center"])
    expect(result.result.value).toBe(1)
  })
  
  it("should get device information", async () => {
    mockContractCall.mockResolvedValueOnce({
      result: {
        value: {
          owner: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "device-type": "temperature-sensor",
          location: "city-center",
          status: "active",
        },
      },
    })
    
    const result = await mockContractCall("get-device", [1])
    expect(result.result.value).toEqual({
      owner: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "device-type": "temperature-sensor",
      location: "city-center",
      status: "active",
    })
  })
  
  it("should update device status", async () => {
    mockContractCall.mockResolvedValueOnce({ result: { value: true } })
    
    const result = await mockContractCall("update-device-status", [1, "inactive"])
    expect(result.result.value).toBe(true)
  })
  
  it("should get device count", async () => {
    mockContractCall.mockResolvedValueOnce({ result: { value: 5 } })
    
    const result = await mockContractCall("get-device-count", [])
    expect(result.result.value).toBe(5)
  })
})

