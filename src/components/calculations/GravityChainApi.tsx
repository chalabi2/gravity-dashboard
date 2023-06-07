// api.tsx
import { useEffect, useState } from 'react';
import { ChainTotalSupplyNumbers, Erc20Metadata, EthInfo, GravityInfo, VolumeInfo } from '../../types';

const UPDATE_TIME = 5000;

export const SERVER_URL = "http://66.172.36.132:9000/";

export const useGravityBridgeInfo = () => {
  const [gravityBridgeInfo, setGravityBridgeInfo] = useState<GravityInfo | null>(null);

  useEffect(() => {
    const fetchGravityInfo = async () => {
        let request_url = SERVER_URL + "gravity_bridge_info";
        const requestOptions: any = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
    
        const result = await fetch(request_url, requestOptions);
        const json = await result.json();
      setGravityBridgeInfo(json);
    };

    fetchGravityInfo();
    const interval = setInterval(fetchGravityInfo, UPDATE_TIME);
    return () => clearInterval(interval);
  }, []);

  return gravityBridgeInfo;
};

export const useEthBridgeInfo = () => {
  const [ethBridgeInfo, setEthBridgeInfo] = useState<EthInfo | null>(null);

  useEffect(() => {
    const fetchEthInfo = async () => {
        let request_url = SERVER_URL + "eth_bridge_info";
        const requestOptions: any = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
    
        const result = await fetch(request_url, requestOptions);
        const json: EthInfo = await result.json();
        // reverse so these show up in reverse cronological order
        json.batch_events.reverse()
        json.deposit_events.reverse()
        json.logic_calls.reverse()
        json.valset_updates.reverse()
      setEthBridgeInfo(json);
    };

    fetchEthInfo();
    const interval = setInterval(fetchEthInfo, UPDATE_TIME);
    return () => clearInterval(interval);
  }, []);

  return ethBridgeInfo;
};

export const useSupplyInfo = () => {
  const [supplyInfo, setSupplyInfo] = useState<ChainTotalSupplyNumbers | null>(null);

  useEffect(() => {
    const fetchDistributionInfo = async () => {
        let request_url = SERVER_URL + "supply_info";
        const requestOptions: any = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
    
        const result = await fetch(request_url, requestOptions);
        const json = await result.json();
      setSupplyInfo(json);
    };

    fetchDistributionInfo();
    const interval = setInterval(fetchDistributionInfo, UPDATE_TIME);
    return () => clearInterval(interval);
  }, []);

  return supplyInfo;
};

export const useErc20Metadata = () => {
  const [erc20Metadata, setErc20Metadata] = useState<Array<Erc20Metadata> | null>(null);

  useEffect(() => {
    const fetchErc20Metadata = async () => {
        let request_url = SERVER_URL + "erc20_metadata";
        const requestOptions: any = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
    
        const result = await fetch(request_url, requestOptions);
        const json = await result.json();
      setErc20Metadata(json);
    };

    fetchErc20Metadata();
    const interval = setInterval(fetchErc20Metadata, UPDATE_TIME);
    return () => clearInterval(interval);
  }, []);

  return erc20Metadata;
};

export const useVolumeInfo = () => {
  const [volumeInfo, setVolumeInfo] = useState<VolumeInfo | null>(null);
  const [yesterdayVolumeInfo, setYesterdayVolumeInfo] = useState<VolumeInfo | null>(null);
  const [dayBeforeYesterdayVolumeInfo, setDayBeforeYesterdayVolumeInfo] = useState<VolumeInfo | null>(null);
  
  const ONE_DAY = 1000 * 60 * 60 * 24; // Milliseconds in a day

  useEffect(() => {
    const fetchVolumeInfo = async () => {
      let request_url = SERVER_URL + "bridge_volume";
      const requestOptions: any = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
  
      const result = await fetch(request_url, requestOptions);
      const json = await result.json();

      // Set the day before yesterday's info to yesterday's info before updating
      setDayBeforeYesterdayVolumeInfo(yesterdayVolumeInfo);
      // Set yesterday's info to the last fetched info before updating the current info
      setYesterdayVolumeInfo(volumeInfo);
      setVolumeInfo(json);
    };

    fetchVolumeInfo();
    const interval = setInterval(fetchVolumeInfo, ONE_DAY); // Update to use 24 hour interval
    return () => clearInterval(interval);
  }, [volumeInfo, yesterdayVolumeInfo]);

  return { 
    today: volumeInfo, 
    yesterday: yesterdayVolumeInfo,
    dayBeforeYesterday: dayBeforeYesterdayVolumeInfo 
  };
};
