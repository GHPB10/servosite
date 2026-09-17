import React, { useState } from 'react';

interface ServoTechLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'white' | 'dark' | 'auto';
  alt?: string;
}

/**
 * Componente oficial de logotipo da Servo Tech
 * Substitui o antigo bloquinho composto (ícone + texto separado)
 * pela identidade visual unificada oficial conforme imagem 6.png.
 */
export function ServoTechLogo({
  className = 'h-10 sm:h-12 w-auto',
  size = 'md',
  variant = 'white',
  alt = 'Servo Tech - Soluções em Tecnologia'
}: ServoTechLogoProps) {
  const [imageError, setImageError] = useState(false);

  // Tamanhos pré-definidos caso o usuário use a prop `size`
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
    xl: 'h-14 sm:h-18'
  };

  const activeHeightClass = className || sizeClasses[size];

  // Tenta carregar o arquivo rasterizado oficial enviado (6.png ou servo-logo.png)
  if (!imageError) {
    return (
      <img
        src="/6.png"
        alt={alt}
        className={`${activeHeightClass} object-contain transition-transform duration-200 select-none`}
        onError={(e) => {
          // Se 6.png falhar, tenta servo-logo.png antes do fallback
          const target = e.currentTarget;
          if (target.src.endsWith('/6.png')) {
            target.src = '/servo-logo.png';
          } else {
            setImageError(true);
          }
        }}
      />
    );
  }

  // Fallback vetorial SVG de ultra-alta definição e fundo transparente
  return (
    <svg
      viewBox="0 0 760 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${activeHeightClass} w-auto object-contain transition-transform duration-200 select-none`}
      role="img"
      aria-label={alt}
    >
      <g fill={variant === 'dark' ? '#0f172a' : '#ffffff'}>
        {/* Símbolo: Monograma Triângulo Chiral Delta Oficial */}
        <g transform="translate(15, 15) scale(0.19)">
          {/* Barra Superior: Trapézio Horizontal */}
          <polygon points="192,246 640,246 586,354 254,354" />
          {/* Barra Direita: Diagonal Superior-Direita */}
          <polygon points="722,246 832,246 602,656 548,550" />
          {/* Barra Esquerda: Diagonal Inferior-Esquerda até a ponta */}
          <polygon points="288,412 398,412 512,798" />
        </g>

        {/* Logotipia: servo */}
        <g transform="translate(195, 30)">
          {/* 's' */}
          <path d="M 68,36 C 60,26 47,20 34,20 C 18,20 6,30 6,46 C 6,61 18,69 36,75 C 57,82 72,90 72,110 C 72,130 54,142 34,142 C 18,142 5,134 -3,124 L 12,106 C 18,114 26,120 35,120 C 43,120 50,115 50,107 C 50,97 39,91 23,85 C 6,78 -10,68 -10,48 C -10,27 7,4 34,4 C 48,4 62,10 72,20 Z" transform="translate(10, 0)" />

          {/* 'e' */}
          <path d="M 175,73 C 175,34 148,4 109,4 C 71,4 44,33 44,76 C 44,119 72,142 110,142 C 133,142 154,131 167,114 L 149,97 C 139,109 127,117 110,117 C 88,117 69,102 67,80 L 175,80 C 175,78 175,75 175,73 Z M 68,60 C 72,40 88,25 109,25 C 130,25 145,40 149,60 Z" />

          {/* 'r' */}
          <path d="M 205,8 L 228,8 L 228,31 C 236,13 251,4 269,4 C 278,4 284,6 289,9 L 279,33 C 274,30 269,29 262,29 C 246,29 229,43 228,61 L 228,140 L 205,140 Z" />

          {/* 'v' */}
          <path d="M 300,8 L 325,8 L 351,96 L 377,8 L 402,8 L 364,140 L 338,140 Z" />

          {/* 'o' */}
          <path d="M 475,4 C 435,4 403,35 403,75 C 403,114 435,142 475,142 C 515,142 547,114 547,75 C 547,35 515,4 475,4 Z M 475,29 C 501,29 521,49 521,75 C 521,100 501,117 475,117 C 449,117 429,100 429,75 C 429,49 449,29 475,29 Z" />
        </g>

        {/* Subtítulo: tech */}
        <g transform="translate(620, 160)">
          <text
            x="110"
            y="35"
            font-family="'Montserrat', 'Inter', system-ui, -apple-system, sans-serif"
            font-weight="700"
            font-size="44"
            letter-spacing="2"
            text-anchor="end"
          >
            tech
          </text>
        </g>
      </g>
    </svg>
  );
}
