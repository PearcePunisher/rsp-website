'use client';

import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Link, MessageSquare, User, Download, Copy, Check, Terminal, Palette, RotateCcw } from 'lucide-react';
import type QRCodeStyling from 'qr-code-styling';
import type { FileExtension, Options } from 'qr-code-styling';
import qrcode from 'qrcode-generator';

const TRANSLATIONS = {
  "en-US": {
    "appTitle": "QR Code Generator",
    "appDescription": "Generate QR codes for URLs, text, and contact information",
    "urlTab": "URL",
    "textTab": "Text",
    "contactTab": "Contact",
    "enterUrl": "Enter URL",
    "enterText": "Enter Text",
    "contactInformation": "Contact Information",
    "websiteUrl": "Website URL",
    "urlPlaceholder": "example.com or https://example.com",
    "urlHelp": "Enter a website URL. If you don't include http://, we'll add https:// automatically.",
    "textContent": "Text Content",
    "textPlaceholder": "Enter any text to generate QR code...",
    "firstName": "First Name",
    "firstNamePlaceholder": "John",
    "lastName": "Last Name",
    "lastNamePlaceholder": "Doe",
    "phoneNumber": "Phone Number",
    "phonePlaceholder": "+1 (555) 123-4567",
    "emailAddress": "Email Address",
    "emailPlaceholder": "john.doe@example.com",
    "organization": "Organization",
    "organizationPlaceholder": "Company Name",
    "website": "Website",
    "websitePlaceholder": "https://example.com",
    "clearAllFields": "Clear All Fields",
    "generatedQrCode": "Generated QR Code",
    "scanQrCode": "Scan this QR code with your device",
    "fillFormPrompt": "Fill in the form to generate your QR code",
    "download": "Download",
    "copyData": "Copy Data",
    "copied": "Copied!",
    "qrCodeData": "QR Code Data:",
    "footerText": "Generate QR codes instantly • No data stored • Free to use",
    "qrCodeAlt": "Generated QR Code",
    "customizeColors": "Customize Colors",
    "codeColor": "Code",
    "backgroundColor": "Background",
    "cornerColor": "Corner Squares",
    "resetColors": "Reset colors",
    "exportFormat": "Format",
    "transparentBackground": "Transparent background"
  },
  "es-ES": {
    "appTitle": "Generador de Códigos QR",
    "appDescription": "Genera códigos QR para URLs, texto e información de contacto",
    "urlTab": "URL",
    "textTab": "Texto",
    "contactTab": "Contacto",
    "enterUrl": "Ingresa URL",
    "enterText": "Ingresa Texto",
    "contactInformation": "Información de Contacto",
    "websiteUrl": "URL del Sitio Web",
    "urlPlaceholder": "ejemplo.com o https://ejemplo.com",
    "urlHelp": "Ingresa una URL de sitio web. Si no incluyes http://, agregaremos https:// automáticamente.",
    "textContent": "Contenido de Texto",
    "textPlaceholder": "Ingresa cualquier texto para generar código QR...",
    "firstName": "Nombre",
    "firstNamePlaceholder": "Juan",
    "lastName": "Apellido",
    "lastNamePlaceholder": "Pérez",
    "phoneNumber": "Número de Teléfono",
    "phonePlaceholder": "+1 (555) 123-4567",
    "emailAddress": "Dirección de Correo",
    "emailPlaceholder": "juan.perez@ejemplo.com",
    "organization": "Organización",
    "organizationPlaceholder": "Nombre de la Empresa",
    "website": "Sitio Web",
    "websitePlaceholder": "https://ejemplo.com",
    "clearAllFields": "Limpiar Todos los Campos",
    "generatedQrCode": "Código QR Generado",
    "scanQrCode": "Escanea este código QR con tu dispositivo",
    "fillFormPrompt": "Completa el formulario para generar tu código QR",
    "download": "Descargar",
    "copyData": "Copiar Datos",
    "copied": "¡Copiado!",
    "qrCodeData": "Datos del Código QR:",
    "footerText": "Genera códigos QR al instante • No se almacenan datos • Gratis",
    "qrCodeAlt": "Código QR Generado",
    "customizeColors": "Personalizar Colores",
    "codeColor": "Código",
    "backgroundColor": "Fondo",
    "cornerColor": "Esquinas",
    "resetColors": "Restablecer colores",
    "exportFormat": "Formato",
    "transparentBackground": "Fondo transparente"
  }
} as const;

type LocaleKey = keyof typeof TRANSLATIONS;

const appLocale = '{{APP_LOCALE}}';

const findMatchingLocale = (locale: string): LocaleKey => {
  if (locale in TRANSLATIONS) return locale as LocaleKey;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return (match as LocaleKey) || 'en-US';
};

const getBrowserLocale = () => {
  if (typeof window === 'undefined') return 'en-US';
  return navigator.languages?.[0] || navigator.language || 'en-US';
};

const browserLocale = getBrowserLocale();
const locale: LocaleKey = (appLocale !== '{{APP_LOCALE}}') ? findMatchingLocale(appLocale) : findMatchingLocale(browserLocale);

const t = (key: string): string => {
  const localTranslations = TRANSLATIONS[locale] as Record<string, string>;
  const enTranslations = TRANSLATIONS['en-US'] as Record<string, string>;
  return localTranslations?.[key] || enTranslations[key] || key;
};

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

const DEFAULT_COLORS = {
  dots: '#000000',
  background: '#ffffff',
  corners: '#000000',
} as const;

const EXPORT_FORMATS: { value: FileExtension; label: string }[] = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' },
  { value: 'svg', label: 'SVG' },
];

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  // Color customization
  const [dotsColor, setDotsColor] = useState<string>(DEFAULT_COLORS.dots);
  const [backgroundColor, setBackgroundColor] = useState<string>(DEFAULT_COLORS.background);
  const [cornersColor, setCornersColor] = useState<string>(DEFAULT_COLORS.corners);
  const [transparentBg, setTransparentBg] = useState(false);

  // Export format
  const [exportFormat, setExportFormat] = useState<FileExtension>('png');

  // Form states for different types
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    url: ''
  });

  // Transparent background can't be expressed by a color input, so it's a
  // separate flag. rgba(0,0,0,0) gives a real transparent fill for the
  // preview and PNG export.
  const effectiveBackground = transparentBg ? 'rgba(0,0,0,0)' : backgroundColor;

  const buildQrOptions = (data: string, background: string = effectiveBackground): Options => ({
    width: 300,
    height: 300,
    type: 'svg',
    data,
    margin: 10,
    qrOptions: { errorCorrectionLevel: 'M' },
    dotsOptions: { color: dotsColor, type: 'square' },
    backgroundOptions: { color: background },
    cornersSquareOptions: { color: cornersColor, type: 'square' },
    cornersDotOptions: { color: cornersColor, type: 'square' },
  });

  // Build a clean, self-contained SVG (one filled rect per module, no
  // clip-paths) for the SVG export. The library's own SVG relies on
  // clip-path references that many vector editors / viewers don't honour,
  // which collapses the code into solid blocks. This is universally
  // compatible and uses the same QR algorithm the library does, so it
  // matches the preview.
  const buildCleanSvg = (data: string): string => {
    const qr = qrcode(0, 'M');
    qr.addData(data);
    qr.make();
    const count = qr.getModuleCount();
    const quiet = 4; // standard 4-module quiet zone
    const dim = count + quiet * 2;

    const inFinder = (r: number, c: number) =>
      (r < 7 && c < 7) ||
      (r < 7 && c >= count - 7) ||
      (r >= count - 7 && c < 7);

    let dotsPath = '';
    let cornersPath = '';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (!qr.isDark(r, c)) continue;
        const seg = `M${c + quiet} ${r + quiet}h1v1h-1z`;
        if (inFinder(r, c)) cornersPath += seg;
        else dotsPath += seg;
      }
    }

    const bgRect = transparentBg
      ? ''
      : `<rect width="${dim}" height="${dim}" fill="${backgroundColor}"/>`;
    return (
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" ` +
      `viewBox="0 0 ${dim} ${dim}" shape-rendering="crispEdges">` +
      `${bgRect}` +
      `<path fill="${dotsColor}" d="${dotsPath}"/>` +
      `<path fill="${cornersColor}" d="${cornersPath}"/>` +
      `</svg>`
    );
  };

  const formatUrl = (url: string) => {
    if (!url.trim()) return '';
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const generateVCard = (contact: ContactInfo) => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName} ${contact.lastName}
N:${contact.lastName};${contact.firstName};;;
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.url}
END:VCARD`;
    return vcard;
  };

  useEffect(() => {
    let data = '';
    
    switch (activeTab) {
      case 'url':
        data = formatUrl(urlInput);
        break;
      case 'text':
        data = textInput;
        break;
      case 'contact':
        if (contactInfo.firstName || contactInfo.lastName || contactInfo.phone || contactInfo.email) {
          data = generateVCard(contactInfo);
        }
        break;
      default:
        data = '';
    }
    
    setQrData(data);
  }, [activeTab, urlInput, textInput, contactInfo]);

  // Render / update the QR code whenever the data or colors change.
  useEffect(() => {
    if (!qrData.trim()) {
      qrInstanceRef.current = null;
      return;
    }

    let cancelled = false;
    const options = buildQrOptions(qrData);

    (async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      if (cancelled || !qrContainerRef.current) return;

      if (!qrInstanceRef.current) {
        qrInstanceRef.current = new QRCodeStyling(options);
      } else {
        qrInstanceRef.current.update(options);
      }

      // The container is conditionally rendered, so re-append on (re)mount.
      if (qrContainerRef.current.childElementCount === 0) {
        qrInstanceRef.current.append(qrContainerRef.current);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData, dotsColor, backgroundColor, cornersColor, transparentBg]);

  const downloadQRCode = async () => {
    if (!qrData) return;
    const name = `qr-code-${activeTab}`;

    if (exportFormat === 'svg') {
      const blob = new Blob([buildCleanSvg(qrData)], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.svg`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    // JPEG has no alpha channel, so a transparent background would render as
    // black. Fall back to a white background for that one combination.
    if (exportFormat === 'jpeg' && transparentBg) {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      const opaque = new QRCodeStyling(buildQrOptions(qrData, '#ffffff'));
      await opaque.download({ name, extension: 'jpeg' });
      return;
    }

    if (qrInstanceRef.current) {
      await qrInstanceRef.current.download({ name, extension: exportFormat });
    }
  };

  const resetColors = () => {
    setDotsColor(DEFAULT_COLORS.dots);
    setBackgroundColor(DEFAULT_COLORS.background);
    setCornersColor(DEFAULT_COLORS.corners);
    setTransparentBg(false);
  };

  const copyToClipboard = async () => {
    if (qrData) {
      try {
        await navigator.clipboard.writeText(qrData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const resetForm = () => {
    setUrlInput('');
    setTextInput('');
    setContactInfo({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      organization: '',
      url: ''
    });
    setQrData('');
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = '';
    }
  };

  const tabs = [
    { id: 'url', label: t('urlTab'), icon: Link },
    { id: 'text', label: t('textTab'), icon: MessageSquare },
    { id: 'contact', label: t('contactTab'), icon: User }
  ];

  return (
    <div className="container-max py-16 space-y-10">
      {/* Header */}
      <header className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0b1419] border border-cyan-500/30 rounded-lg mb-2 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          <Terminal className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className="font-display tracking-wide text-4xl md:text-5xl text-white">
          {t('appTitle')}
        </h1>
        <p className="text-slate-400 text-base max-w-prose mx-auto">{t('appDescription')}</p>
      </header>

      <div className="panel rounded-md border border-cyan-500/20 overflow-hidden max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="border-b border-cyan-500/20 bg-[#0b1419]/50">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-cyan-300 border-b-2 border-cyan-500 bg-cyan-500/5'
                      : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-900/20'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-xl text-white mb-6 tracking-wide">
                  {activeTab === 'url' && t('enterUrl')}
                  {activeTab === 'text' && t('enterText')}
                  {activeTab === 'contact' && t('contactInformation')}
                </h2>

                {/* URL Input */}
                {activeTab === 'url' && (
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                      {t('websiteUrl')}
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder={t('urlPlaceholder')}
                      className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                    />
                    <p className="text-xs text-slate-500">
                      {t('urlHelp')}
                    </p>
                  </div>
                )}

                {/* Text Input */}
                {activeTab === 'text' && (
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                      {t('textContent')}
                    </label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder={t('textPlaceholder')}
                      rows={6}
                      className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600 resize-none"
                    />
                  </div>
                )}

                {/* Contact Input */}
                {activeTab === 'contact' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                          {t('firstName')}
                        </label>
                        <input
                          type="text"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                          placeholder={t('firstNamePlaceholder')}
                          className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                          {t('lastName')}
                        </label>
                        <input
                          type="text"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                          placeholder={t('lastNamePlaceholder')}
                          className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                        {t('phoneNumber')}
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        placeholder={t('phonePlaceholder')}
                        className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                        {t('emailAddress')}
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        placeholder={t('emailPlaceholder')}
                        className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                        {t('organization')}
                      </label>
                      <input
                        type="text"
                        value={contactInfo.organization}
                        onChange={(e) => setContactInfo({...contactInfo, organization: e.target.value})}
                        placeholder={t('organizationPlaceholder')}
                        className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                        {t('website')}
                      </label>
                      <input
                        type="url"
                        value={contactInfo.url}
                        onChange={(e) => setContactInfo({...contactInfo, url: e.target.value})}
                        placeholder={t('websitePlaceholder')}
                        className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full text-slate-200 placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={resetForm}
                className="text-sm text-slate-500 hover:text-red-400 transition-colors underline decoration-slate-700 hover:decoration-red-400 underline-offset-4"
              >
                {t('clearAllFields')}
              </button>
            </div>

            {/* QR Code Display Section */}
            <div className="flex flex-col items-center space-y-8">
              <h2 className="font-display text-xl text-white tracking-wide">{t('generatedQrCode')}</h2>
              
              <div className="brackets p-6 w-full max-w-sm flex flex-col items-center justify-center min-h-[300px] bg-[#0b1419]/50 border border-cyan-500/10 rounded-sm">
                {qrData ? (
                  <div className="text-center w-full">
                    <div
                      ref={qrContainerRef}
                      className="flex justify-center rounded-sm mb-4 mx-auto w-fit overflow-hidden [&_svg]:max-w-full [&_svg]:h-auto"
                      style={transparentBg ? {
                        backgroundColor: '#ffffff',
                        backgroundImage:
                          'linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%)',
                        backgroundSize: '16px 16px',
                        backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
                      } : undefined}
                    >
                      {/* QR code will be dynamically inserted here */}
                    </div>
                    <p className="text-xs text-slate-500 font-mono">
                      {t('scanQrCode')}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <QrCode className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">
                      {t('fillFormPrompt')}
                    </p>
                  </div>
                )}
              </div>

              {/* Color customization */}
              <div className="w-full max-w-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs tracking-wider text-cyan-300 uppercase font-semibold flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5" />
                    {t('customizeColors')}
                  </h3>
                  <button
                    onClick={resetColors}
                    className="text-xs text-slate-500 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {t('resetColors')}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: t('codeColor'), value: dotsColor, onChange: setDotsColor, disabled: false },
                    { label: t('backgroundColor'), value: backgroundColor, onChange: setBackgroundColor, disabled: transparentBg },
                    { label: t('cornerColor'), value: cornersColor, onChange: setCornersColor, disabled: false },
                  ].map((swatch) => (
                    <label
                      key={swatch.label}
                      className={`flex flex-col items-center gap-2 bg-[#0b1419] border border-cyan-500/20 rounded-md py-3 transition-colors ${
                        swatch.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-cyan-500/40'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 text-center px-1 leading-tight">
                        {swatch.label}
                      </span>
                      <input
                        type="color"
                        value={swatch.value}
                        disabled={swatch.disabled}
                        onChange={(e) => swatch.onChange(e.target.value)}
                        className="w-9 h-9 rounded-md border border-cyan-500/30 bg-transparent cursor-pointer p-0 disabled:cursor-not-allowed"
                      />
                    </label>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={transparentBg}
                    onChange={(e) => setTransparentBg(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                  {t('transparentBackground')}
                </label>
              </div>

              {qrData && (
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <div className="flex flex-1 gap-2">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as FileExtension)}
                      aria-label={t('exportFormat')}
                      className="bg-[#0b1419] border border-cyan-500/30 rounded-md px-3 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                    >
                      {EXPORT_FORMATS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={downloadQRCode}
                      className="btn justify-center flex-1"
                    >
                      <Download className="w-4 h-4" />
                      {t('download')}
                    </button>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="btn justify-center flex-1 bg-transparent border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-950"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t('copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t('copyData')}
                      </>
                    )}
                  </button>
                </div>
              )}

              {qrData && (
                <div className="w-full max-w-sm">
                  <h3 className="text-xs tracking-wider text-cyan-300 uppercase font-semibold mb-2">{t('qrCodeData')}</h3>
                  <div className="bg-[#0b1419] border border-cyan-500/20 rounded-md p-3 text-xs text-slate-400 max-h-32 overflow-y-auto font-mono break-all">
                    {qrData}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-cyan-500/10 text-slate-500 text-sm">
        <p>{t('footerText')}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
