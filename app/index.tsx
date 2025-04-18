import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import colors from "./lib/colors";
import { getImageUrl, parseIdInUrl } from "./lib/pokemons";
import { AppText } from "./components/app-text";
import PokeballIcon from "./components/pokeball-icon";
import Feather from '@expo/vector-icons/Feather';
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { FilterModal, Filters } from "./components/filter-modal";

const isEmptySearchString = (string: string) => {
  return string.trim() === '';
}

export default function Index() {
  const [searchKey, setSearchKey] = useState<string>("")
  const [sortBy, setSortBy] = useState<Filters>();
  const debounceSearchKey = useDebounce<string>(searchKey, 500);

  const { isPending, isError, data } = useQuery<GetPokemons>({
    queryKey: ['pokemons', debounceSearchKey],
    queryFn: async () => {
      if (!isEmptySearchString(searchKey)) {
        const response = await fetch(`https://pokemon-service-ucql.onrender.com/api/v1/pokemon/search?name=${searchKey.toLocaleLowerCase()}`);
        const result = await response.json();
        return {
          count: result.length,
          previous: null,
          next: null,
          results: result
        };
      }

      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const result = await response.json();
      return result;
    }
  })

  const sortPokemons = (a: GetPokemons['results'][number], b: GetPokemons['results'][number]) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'number') {
      return parseIdInUrl(a.url) - parseIdInUrl(b.url);
    }
    return 0;
  }

  return (
    <View style={{ backgroundColor: colors.primary, flexDirection: 'column', height: '100%' }}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PokeballIcon />
          <AppText style={{ color: 'white' }} variant="title">Pokédex</AppText>
        </View>
        <View style={styles.headerRow}>
          <View style={styles.headerSearch}>
            <Feather style={styles.headerSearchIcon} name="search" size={16} />
            <TextInput
              value={searchKey}
              style={[styles.headerSearchInput, !isEmptySearchString(searchKey) && styles.headerSearchInputActive]}
              placeholder="Search"
              onChangeText={(text) => setSearchKey(text)} />
            {!isEmptySearchString(searchKey) && <TouchableOpacity onPress={() => setSearchKey("")}
              style={styles.headerSearchCancelButton}>
              <Feather
                color={colors.primary}
                name="x"
                size={16} />
            </TouchableOpacity>
            }
          </View>
          <FilterModal
            sortBy={sortBy}
            setSortBy={setSortBy} />
        </View>
      </View>
      <View style={styles.main}>
        {isError ? <AppText style={{ textAlign: 'center' }}>Une erreur est survenue</AppText> :
          isPending ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <FlatList
              style={{ paddingTop: 24, paddingLeft: 12, paddingRight: 12 }}
              data={data?.results.sort(sortPokemons)}
              numColumns={3}
              columnWrapperStyle={styles.pokemonsListRow}
              renderItem={({ item }) => (
                <View style={styles.pokemonsListCard}>
                  <Image
                    style={styles.pokemonsListCardImage}
                    source={{ uri: getImageUrl(parseIdInUrl(item.url)) }} />
                  <View style={styles.pokemonsListCardText}>
                    <AppText
                      numberOfLines={1}
                      style={{
                        fontSize: 10,
                        lineHeight: 16,
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        textTransform: 'capitalize'
                      }}>{item.name}</AppText>
                  </View>
                  <AppText style={styles.pokemonsListCardId}>
                    #{parseIdInUrl(item.url)}
                  </AppText>
                </View>
              )} />
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    backgroundColor: colors.primary,
    flexDirection: 'column',
    gap: 8
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  headerSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 32,
    fontSize: 12,
  },
  headerSearchIcon: {
    position: 'absolute',
    pointerEvents: 'none',
    color: colors.primary,
    left: 12,
    zIndex: 2
  },
  headerSearchCancelButton: {
    position: 'absolute',
    color: colors.primary,
    right: 12,
    zIndex: 2
  },
  headerSearchInput: {
    borderRadius: 16,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 40,
    paddingRight: 40,
    zIndex: 1,
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.25) inset;'
  },
  headerSearchInputActive: {
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowColor: "rgba(0, 0, 0, 0.2)"
  },
  headerSearchButton: {
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.25) inset;',
    backgroundColor: 'white',
  },
  main: {
    backgroundColor: 'white',
    flex: 1,
    margin: 4,
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.25) inset;',
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  pokemonsListRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  pokemonsListCard: {
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    position: 'relative',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    shadowColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    paddingTop: 16,
  },
  pokemonsListCardImage: {
    width: 72,
    height: 72,
    zIndex: 1
  },
  pokemonsListCardText: {
    backgroundColor: '#efefef',
    width: '100%',
    borderRadius: 8,
    marginTop: -24,
    paddingTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 4
  },
  pokemonsListCardId: {
    position: 'absolute',
    top: 4,
    fontSize: 8,
    lineHeight: 12,
    right: 4,
    color: "#666666"
  }
});

