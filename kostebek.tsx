import React, { useState, useCallback } from 'react';
import Head from 'next/head';

// --- Kelime Havuzu: Kategori ve 50'şer Kelimelik Liste ---
interface KelimeHavuzu {
  [kategori: string]: string[];
}

const KELIME_HAVUZU: KelimeHavuzu = {
  'Türk Ünlüler': ['Tarkan', 'Kıvanç Tatlıtuğ', 'Acun Ilıcalı', 'Hadise', 'Cem Yılmaz', /* ... 45 kelime daha */ 'Şahan Gökbakar'],
  'Manifest Kızları': ['Enerji', 'Frekans', 'Rezonans', 'Evren', 'Şifa', /* ... 45 kelime daha */ 'Karma'],
  'Genel Eşyalar': ['Masa', 'Sandalye', 'Çatal', 'Kaşık', 'Perde', /* ... 45 kelime daha */ 'Halı'],
  'Yiyecekler': ['Domates', 'Makarna', 'Lahmacun', 'Çikolata', 'Peynir', /* ... 45 kelime daha */ 'Ayran'],
  'Avrupa Ülkeleri': ['Almanya', 'Fransa', 'İtalya', 'İspanya', 'Yunanistan', /* ... 45 kelime daha */ 'Polonya'],
  'Nesneler': ['Bulut', 'Zaman', 'Para', 'Gölge', 'Ruh', /* ... 45 kelime daha */ 'Hava'],
};
// ---------------------------------------------------------

// --- Ana Bileşen ---
const KöstebekKimOyunu: React.FC = () => {
  const [kelimeler, setKelimeler] = useState<string[]>([]);
  const [kategori, setKategori] = useState<string>('');
  const OYUNCU_SAYISI = 4;
  const KOSTEBEK_KELIMESI = "KÖSTEBEK!"; // Köstebek'e özel kelime

  // Rastgele bir eleman seçme yardımcı fonksiyonu
  const rastgeleSec = <T,>(dizi: T[]): T => {
    return dizi[Math.floor(Math.random() * dizi.length)];
  };

  const kelimeCek = useCallback(() => {
    const kategoriler = Object.keys(KELIME_HAVUZU);
    
    // 1. Rastgele Kategori Seç
    const secilenKategori = rastgeleSec(kategoriler);
    setKategori(secilenKategori);
    
    // 2. Kategoriden Kelime Seç
    const secilenKelime = rastgeleSec(KELIME_HAVUZU[secilenKategori]);
    
    // 3. Köstebek'i Belirle
    const kostebekIndex = Math.floor(Math.random() * OYUNCU_SAYISI);
    
    // 4. Kelimeleri Dağıt
    const yeniKelimeler: string[] = [];
    for (let i = 0; i < OYUNCU_SAYISI; i++) {
      if (i === kostebekIndex) {
        yeniKelimeler.push(KOSTEBEK_KELIMESI);
      } else {
        yeniKelimeler.push(secilenKelime);
      }
    }
    
    setKelimeler(yeniKelimeler);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <Head>
        <title>Köstebek Kim? - Web Oyunu</title>
      </Head>

      <h1>🕳️ Köstebek Kim?</h1>
      <p>Oyun 4 kişiliktir. Herkes kendi kelimesini tek tek görecek.</p>

      <button
        onClick={kelimeCek}
        style={{
          padding: '15px 30px',
          fontSize: '20px',
          cursor: 'pointer',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginBottom: '30px',
        }}
      >
        Kelime Çek! (Yeni Oyun Başlat)
      </button>

      {kategori && <h2 style={{ color: '#4CAF50' }}>Kategori: {kategori}</h2>}
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {kelimeler.map((kelime, index) => (
          <KelimeKarti key={index} oyuncuNo={index + 1} kelime={kelime} />
        ))}
      </div>
    </div>
  );
};

// --- Oyuncu Kartı Bileşeni ---
interface KelimeKartiProps {
  oyuncuNo: number;
  kelime: string;
}

const KelimeKarti: React.FC<KelimeKartiProps> = ({ oyuncuNo, kelime }) => {
  const [goster, setGoster] = useState(false);

  return (
    <div
      style={{
        border: '2px solid #333',
        padding: '20px',
        margin: '10px',
        width: '200px',
        minHeight: '150px',
        borderRadius: '10px',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: goster ? (kelime === "KÖSTEBEK!" ? '#ffcccc' : '#ccffcc') : '#f0f0f0'
      }}
    >
      <h3>Oyuncu {oyuncuNo}</h3>
      {kelime ? (
        goster ? (
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: kelime === "KÖSTEBEK!" ? 'red' : 'green' }}>
            {kelime}
          </p>
        ) : (
          <button
            onClick={() => setGoster(true)}
            style={{
              padding: '10px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Kelimeyi Gör
          </button>
        )
      ) : (
        <p>Kelime Çekilmedi.</p>
      )}
    </div>
  );
};

export default KöstebekKimOyunu;
