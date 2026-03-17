"use client";
import { useState } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Monitor,
  Cable,
  Tv,
  Video,
  Power,
  Plus,
  Minus,
  VolumeX,
  Volume1,
} from 'lucide-react';

export function ConferenceRoomControl() {
  const [systemPower, setSystemPower] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [speaker1Enabled, setSpeaker1Enabled] = useState(true);
  const [speaker2Enabled, setSpeaker2Enabled] = useState(true);
  const [computerEnabled, setComputerEnabled] = useState(false);
  const [hdmi1Enabled, setHdmi1Enabled] = useState(false);
  const [hdmi2Enabled, setHdmi2Enabled] = useState(false);
  const [liveTvEnabled, setLiveTvEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [channel, setChannel] = useState(1);
  const [volume, setVolume] = useState(50);

  const handleChannelUp = () => {
    setChannel((prev) => Math.min(prev + 1, 999));
  };

  const handleChannelDown = () => {
    setChannel((prev) => Math.max(prev - 1, 1));
  };

  const handleVolumeUp = () => {
    setVolume((prev) => Math.min(prev + 5, 100));
  };

  const handleVolumeDown = () => {
    setVolume((prev) => Math.max(prev - 5, 0));
  };

  const ControlButton = ({
    label,
    icon: Icon,
    active,
    onClick,
    variant = 'default',
  }: {
    label: string;
    icon: any;
    active: boolean;
    onClick: () => void;
    variant?: 'default' | 'power' | 'mute';
  }) => {
    const getButtonStyles = () => {
      if (variant === 'power') {
        return active
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-red-500 hover:bg-red-600 text-white';
      }
      if (variant === 'mute') {
        return active
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300';
      }
      return active
        ? 'bg-blue-500 hover:bg-blue-600 text-white'
        : 'bg-gray-700 hover:bg-gray-600 text-gray-300';
    };

    return (
      <button
        onClick={onClick}
        disabled={!systemPower && variant !== 'power'}
        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${getButtonStyles()} ${
          !systemPower && variant !== 'power' ? 'opacity-30 cursor-not-allowed' : ''
        }`}
      >
        <Icon className="w-6 h-6 mb-2" />
        <span className="text-xs text-center">{label}</span>
      </button>
    );
  };

  return (
    <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl p-8 mx-auto my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl text-white">Conference Room Control</h1>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              systemPower ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}
          />
          <span className="text-gray-400 text-sm">
            {systemPower ? 'System Online' : 'System Offline'}
          </span>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <ControlButton
          label="Microphone"
          icon={Mic}
          active={micEnabled}
          onClick={() => setMicEnabled(!micEnabled)}
        />
        <ControlButton
          label="Speaker 1"
          icon={Volume2}
          active={speaker1Enabled}
          onClick={() => setSpeaker1Enabled(!speaker1Enabled)}
        />
        <ControlButton
          label="Speaker 2"
          icon={Volume2}
          active={speaker2Enabled}
          onClick={() => setSpeaker2Enabled(!speaker2Enabled)}
        />
        <ControlButton
          label="Room Computer"
          icon={Monitor}
          active={computerEnabled}
          onClick={() => setComputerEnabled(!computerEnabled)}
        />
        <ControlButton
          label="HDMI 1"
          icon={Cable}
          active={hdmi1Enabled}
          onClick={() => setHdmi1Enabled(!hdmi1Enabled)}
        />
        <ControlButton
          label="HDMI 2"
          icon={Cable}
          active={hdmi2Enabled}
          onClick={() => setHdmi2Enabled(!hdmi2Enabled)}
        />
        <ControlButton
          label="Live TV"
          icon={Tv}
          active={liveTvEnabled}
          onClick={() => setLiveTvEnabled(!liveTvEnabled)}
        />
        <ControlButton
          label="Room Camera"
          icon={Video}
          active={cameraEnabled}
          onClick={() => setCameraEnabled(!cameraEnabled)}
        />
      </div>

      {/* Channel Control */}
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-white text-lg mb-4">Channel Control</h2>
        <div className="flex items-center justify-between">
          <button
            onClick={handleChannelDown}
            disabled={!systemPower}
            className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="text-5xl text-white font-mono">{channel}</div>
            <div className="text-gray-400 text-sm mt-1">Channel</div>
          </div>
          <button
            onClick={handleChannelUp}
            disabled={!systemPower}
            className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Volume Control */}
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-white text-lg mb-4">Volume Control</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleVolumeDown}
            disabled={!systemPower}
            className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {volume === 0 ? (
                <VolumeX className="w-5 h-5 text-gray-400" />
              ) : volume < 50 ? (
                <Volume1 className="w-5 h-5 text-gray-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-white text-2xl font-mono">{volume}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-200"
                style={{ width: `${volume}%` }}
              />
            </div>
          </div>
          <button
            onClick={handleVolumeUp}
            disabled={!systemPower}
            className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="grid grid-cols-2 gap-4">
        <ControlButton
          label={micMuted ? 'Mic Muted' : 'Mute Microphone'}
          icon={micMuted ? MicOff : Mic}
          active={micMuted}
          onClick={() => setMicMuted(!micMuted)}
          variant="mute"
        />
        <ControlButton
          label={systemPower ? 'System Power ON' : 'System Power OFF'}
          icon={Power}
          active={systemPower}
          onClick={() => setSystemPower(!systemPower)}
          variant="power"
        />
      </div>
    </div>
  );
}