import { makeViewerClient } from './viewer'
import { makePublisherClient } from './publish'

export const makeMillicastClient = (RTCPeerConnection, RTCSessionDescription) => {
  const publisherClient = makePublisherClient(RTCPeerConnection, RTCSessionDescription)
  const viewerClient = makeViewerClient(RTCPeerConnection, RTCSessionDescription)

  return config => {
    const { logger, publisherUrl, viewerUrl } = config

    const getIceServers = async () => {
      return []
    }

    const viewStream = async (milliId, iceServers) => {
      return viewerClient(logger, viewerUrl, milliId, iceServers)
    }

    const publishStream = async (milliId, iceServers, mediaStream) => {
      return publisherClient(logger, publisherUrl, milliId, iceServers, mediaStream)
    }

    return {
      viewStream,
      publishStream,
      getIceServers
    }
  }
}
