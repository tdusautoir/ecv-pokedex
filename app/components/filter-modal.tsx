import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import colors from '../lib/colors';
import Popover from 'react-native-popover-view';
import { AppText } from './app-test';

export type Filters = 'name' | 'number';

const FilterButton = ({
    name,
    currentSortBy,
    setSortBy
}: {
    name: Filters,
    currentSortBy: Filters,
    setSortBy: (name: Filters) => void
}) => {
    const active = currentSortBy === name;

    return (
        <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSortBy(active ? 'number' : name)}>
            <View style={{
                height: 16,
                width: 16,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: colors.theme.primary,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {active ?
                    <View style={{
                        height: 8,
                        width: 8,
                        borderRadius: 6,
                        backgroundColor: colors.theme.primary
                    }} />
                    : null
                }
            </View>
            <AppText style={{ textTransform: 'capitalize' }}>{name}</AppText>
        </TouchableOpacity>
    )
}

export const FilterModal = ({
    sortBy,
    setSortBy
}: {
    sortBy: Filters,
    setSortBy: (filter: Filters) => void
}) => {
    return (
        <>
            <Popover
                offset={16}
                arrowSize={{ width: 0, height: 0 }}
                popoverStyle={styles.container}
                from={(
                    <TouchableOpacity style={styles.button}>
                        <Feather name={sortBy === 'number' ? 'hash' : 'underline'} size={16} color={colors.theme.primary} />
                    </TouchableOpacity>
                )}>
                <AppText style={styles.title}>Sort by:</AppText>
                <View style={styles.filters}>
                    <FilterButton
                        name='name'
                        currentSortBy={sortBy}
                        setSortBy={setSortBy} />
                    <FilterButton
                        name='number'
                        currentSortBy={sortBy}
                        setSortBy={setSortBy} />
                </View>
            </Popover>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.25) inset;',
        backgroundColor: 'white',
    },
    container: {
        backgroundColor: colors.theme.primary,
        padding: 4,
        borderRadius: 12,
    },
    title: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white',
        fontFamily: 'Poppins_600SemiBold'
    },
    filters: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 16
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    }
});
