import { useState } from 'react';
import Button from '../button/button';
import translations from '../../constants/en.global.json';

interface LoginProps {
  generateAndSaveKey: (privateKey: string) => void;
  keyError: boolean;
}

export default function Login({ generateAndSaveKey, keyError }: LoginProps) {
  const [privateKey, setPrivateKey] = useState('');
  const t = translations.loginWrapper;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="relative max-w-[450px] transform overflow-hidden rounded-lg bg-[#1c2123] px-4 pb-4 pt-5 text-left shadow-xl transition-all">
        <div className="text-white text-xl font-bold text-center mb-4">
          {t.loginTitle}
        </div>
        <label className="block mb-2 text-white text-sm text-start mt-4">
          {t.privateKeyText}
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md outline-none bg-black text-white text-sm"
          value={privateKey}
          placeholder={t.placeHolderText}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <div className="h-4 text-xs font-normal text-red-800 pl-2">
          {keyError && `${t.keyGenerationError}`}
        </div>
        <div className="text-gray-400 text-sm px-2 mt-1">
          {t.loginDescription}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            title={t.generateButtonText}
            backgroundColor={!!privateKey ? 'bg-[#ECB159]' : 'bg-[#B67352]'}
            backgroundColorHover=""
            disabled={!privateKey}
            onClick={() => generateAndSaveKey(privateKey)}
          />
        </div>
      </div>
    </div>
  );
}
