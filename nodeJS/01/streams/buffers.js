/*
  É uma representação de dados na memória que o node utiliza, para salvar dados em binário
  O que é muito mais rápido, porque se eu salvar uma string, ele precisa fazer muitas tratativas para salvar aquele dado na memória, p
  porque a memória só aceita dados em binário, então ele precisa salvar os enconding necessários para poder entender aquele dado.

  Resumindo: Buffer é uma representação de dados na memória que são usados para transferência de dados de maneira muito performática,
  porque os dados são salvos em binários.

  Se lembre, a gente popula os dados no buffer com strings
*/