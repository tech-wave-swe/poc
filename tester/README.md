# Proof of Concept: Ricerca di Requisiti nei File di Codice con Ollama

## Descrizione

Questo Proof of Concept (PoC) ha lo scopo di testare varie combinazioni di modelli Ollama per l'estrazione e l'analisi di requisiti all'interno di file di codice sorgente. L'obiettivo principale è valutare l'efficacia e le prestazioni dei modelli nel riconoscere e categorizzare i requisiti software direttamente dal codice.

## Installazione

Per installare e configurare l'ambiente necessario per eseguire il PoC, seguire i seguenti passaggi:

1. **Clonare il repository**

   ```bash
   git clone git@github.com:tech-wave-swe/poc.git
   cd poc/tester
   ```

2. **Installare ed avviare ambiente ChromaDB**

   ```bash
    docker pull chromadb/chroma
    docker run -p 8000:8000 chromadb/chroma
   ```

3. **Configurare Ollama** (se necessario)

   - Assicurarsi che Ollama sia installato e configurato correttamente
   - Scaricare i modelli necessari con il comando:

     ```bash
     ollama pull nomic-embed-text
     ollama pull qwen2.5-coder:7b
     ollama serve
     ```

## Funzionamento

Il PoC permette di eseguire l'analisi dei file di codice per estrarre i requisiti identificati dai modelli Ollama.

### Avvio del modulo

Eseguire lo script principale per avviare l'analisi:

```bash
npm run start
```

### Risultati

Il tester restituisce sul terminale le linee di codice che più si avvicianano al requisito cercato. Restituisce in seguito una risposta definitiva in json con la seguente struttura:

```json
{
    file: filepath,
    line_number: xx
}
```

### Personalizzazione

All'interno del file `main.ts` è possible configurare:

- **Path** dei file in cui ricercare la risposta

  ```typescript
  const files = ["example/main.c"];
  ```

- **Requisiti** da cercare all'interno del modello

  ```typescript
  const questions = ["..."];
  ```

- Tipologia di **modello** utilizzato per l'embedding.

  ```typescript
  const models: Model[] = [
    {
      name: "prefixed-nomic",
      model: "nomic-embed-text",
      qprefix: "search_query: ",
      dprefix: "search_document: ",
    },
  ];
  ```

Vista la struttura modulare risulta possibile effettuare test tra più modelli di embedding specificandoli all'interno della costante `models`.
